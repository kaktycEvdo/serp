<?php
require_once "connect_to_db.php";
require_once "org.php";
require_once "models/all.php";

// should be one, but could be multiple through ", "
$allowed_url = 'http://localhost:5173';

header("Access-Control-Allow-Origin: $allowed_url", true);

$cc = new Company();
$ric = new Resource();
$rc = new ResourceLink();
$wc = new Warehouse();
$snc = new Snapshot();
$gc = new Goal();
$classes = ["company" => $cc, "warehouse" => $wc, "goal" => $gc, "snapshot" => $snc, "resource_info" => $ric, "resource" => $rc];
switch($_SERVER['REQUEST_METHOD']){
    case 'POST':{
        if(!isset($_POST['user_id'])){echo 403; die();}
        if(!isset($_POST['item'])){echo 403; die();}
        if(!getAcception($pdo, $_POST['user_id'])){echo 403; die();}

        $post = $_POST;
        $org = getOrg($pdo, $post['user_id']);
        switch($_POST['item']){
            case "resource_link":{
                $arr = [];
                foreach ($rc->fields as $field) {
                    if($field == 'resources_id') $arr['resources_id'] = $post['resource_id'];
                    else $arr[$field] = $post[$field];
                }
                $rc->post($pdo, $arr);
                break;
            }
            case "snapshot":{
                $arr = [];
                foreach ($classes[$post['item']]->fields as $field) {
                    if($field == 'org_id') $arr['org_id'] = $org;
                    else if($field == 'listing') {
                        $arr['listing'] = json_encode($post['listing']);
                        $goals = $gc->getIf($pdo, "org_id = :id", ["id" => $org]);
                        foreach ($post['listing'] as $supplier_list) {
                            foreach ($supplier_list as $warehouse_list) {
                                foreach ($warehouse_list as $resource_key => $resource) {
                                    foreach ($goals as $goal) {
                                        if(isset($resource["goal$goal->id"])){
                                            $original_listing = json_decode($goal->listing, true);
                                            $listing = $original_listing;
                                            $listing[$resource_key] = $original_listing[$resource_key] - $resource["goal$goal->id"]['amount'];
                                            if($listing[$resource_key] <= 0){
                                                unset($listing[$resource_key]);
                                            }
                                            if(sizeof($listing) == 0){
                                                $q = $pdo->prepare("DELETE FROM goal WHERE id = :id");
                                                $q->bindParam("id", $goal->id);
                                                if(!$q->execute()) {echo 500; die;}
                                            }
                                            else{
                                                $gc->putAccurate($pdo, ["listing" => (json_encode($listing))], ["listing"], $goal->id);
                                            }
                                            
                                            $rlink = $rc->getIf($pdo, "resources_id = :id", ["id" => $resource_key], true);
                                            $rlink ? $rc->putAccurate($pdo, ["amount" => ($rlink->amount + $original_listing[$resource_key] - $resource["goal$goal->id"]['amount']), "price" => $resource['price']], ["amount", "price"], $rlink->id) : null;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else $arr[$field] = $post[$field];
                }
                
                $classes[$post['item']]->post($pdo, $arr);
                break;
            }
            default:{
                $arr = [];
                foreach ($classes[$post['item']]->fields as $field) {
                    if($field == 'org_id') $arr['org_id'] = $org;
                    else if($field == 'listing') $arr['listing'] = $post['listing'];
                    else $arr[$field] = $post[$field];
                }
                $classes[$post['item']]->post($pdo, $arr);
                break;
            }
        }
        break;
    }
    case 'PUT':{
        $body = file_get_contents('php://input');

        $post = [];
        foreach (explode("&", urldecode($body)) as $key_value_pair) {
            $exploded_str = explode("=", $key_value_pair);
            $post[$exploded_str[0]] = $exploded_str[1];
        }

        if(!isset($post['user_id'])){echo 403; die();}
        if(!isset($post['item_id'])){echo 403; die();}
        if(!getAcception($pdo, $post['user_id'])){echo 403; die();}

        $id = $post['item_id'];
        $org = getOrg($pdo, $post['user_id']);
        switch($post['item']){
            case "resource_link":{
                $arr = [];
                foreach ($rc->fields as $field) {
                    if($field == 'resources_id') $arr['resources_id'] = $post['resource_id'];
                    else if($field == 'id') continue;
                    else $arr[$field] = $post[$field];
                }
                $rc->put($pdo, $arr, $id);
                break;
            }
            case "snapshot":{
                $arr = [];
                foreach ($classes[$post['item']]->fields as $field) {
                    if($field == 'org_id') $arr['org_id'] = $org;
                    else if($field == 'id') continue;
                    else if($field == 'listing') $arr['listing'] = json_encode($post['listing']);
                    else $arr[$field] = $post[$field];
                }
                $classes[$post['item']]->put($pdo, $arr, $id);
                break;
            }
            default:{
                $arr = [];
                foreach ($classes[$post['item']]->fields as $field) {
                    if($field == 'org_id') $arr['org_id'] = $org;
                    else if($field == 'id') continue;
                    else if($field == 'listing') $arr['listing'] = $post['listing'];
                    else $arr[$field] = $post[$field];
                }
                $classes[$post['item']]->put($pdo, $arr, $id);
                break;
            }
        }
        break;
    }
    case 'DELETE':{
        if(!isset($_GET['user_id']) || !isset($_GET['item'])){echo 403; die();}
        if(!getAcception($pdo, $_GET['user_id'])){echo 403; die();}

        $id = $_GET['id'];
        $item = $_GET['item'];
        $q = $pdo->prepare("DELETE FROM $item WHERE id = :id");
        $q->bindParam("id", $id);
        if(!$q->execute()) {echo 500; die;}
        echo 200;
        break;
    }
}