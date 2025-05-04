<?php
require_once "connect_to_db.php";
require_once "org.php";
require_once "models/all.php";

if(!isset($_GET['item']) || !isset($_GET['command'])) {echo 504; die;}
if(!isset($_GET['user_id'])) {echo 403; die();}
if(!getAcception($pdo, $_GET['user_id'])) {echo 403; die();}
error_reporting(E_ERROR | E_PARSE);

$item = $_GET['item'];
//get / getAll
$command = $_GET['command'];
switch($item){
    case 'everything':{
        // i.e. [warehouse1 => [resource1 => [supplier1, supplier2], resource2 => [supplier1, supplier3]]]
        if($command == 'getAll'){
            $org = getOrg($pdo, $_GET['user_id']);

            $ric = new Resource();
            $rc = new ResourceLink();
            $wc = new Warehouse();
            $gc = new Goal();
            $cc = new Company();
            $snc = new Snapshot();

            $resources = $ric->getIf($pdo, "org_id = :org_id", ['org_id' => $org]);
            $warehouses = $wc->getIf($pdo, "org_id = :org_id", ['org_id' => $org]);
            $goals = $gc->getIf($pdo, "org_id = :org_id", ["org_id" => $org]);
            $companies = $cc->getIf($pdo, "org_id = :org_id", ["org_id" => $org]);
            $snapshots = $snc->getIf($pdo, "org_id = :org_id", ["org_id" => $org]);
            
            $resources_links = [];
            
            if($warehouses != null && $resources != null){
                $supplied_resources = [];
                $created_resources = [];

                foreach ($resources as $resource) {
                    $resource->amount = null;

                    $res_links = $rc->getIf($pdo, "resource.resources_id = :r_id", ["r_id" => $resource->id]);
                    if(!$res_links) continue;

                    foreach ($res_links as $link) {
                        if(isset($link->supplier) && $link->supplier != null){
                            if(!$supplied_resources[$link->supplier][$link->warehouse_id]) $supplied_resources[$link->supplier][$link->warehouse_id] = [$link];
                            else array_push($supplied_resources[$link->supplier][$link->warehouse_id], $link);
                        }
                        else{
                            array_push($created_resources, $link);
                        }
                        $resource->amount += $link->amount;
                        $link->resource_name = $resource->name;
                        $link->resource = $resource;
                    }
                }
                $resources_links = ["created" => $created_resources, "supplied" => $supplied_resources];
            }


            $data = ["resources" => $resources, "warehouses" => $warehouses, "goals" => $goals, "companies" => $companies, "snapshots" => $snapshots, "resource_links" => $resources_links];
            header("Content-Type: application/json");
            echo json_encode($data);
        }
        else{
            echo 504;
        }
        break;
    }
    case 'users':{
        $org = getOrg($pdo, $_GET['user_id']);

        $q = $pdo->prepare("SELECT email FROM users WHERE org_id = :org and accepted = 0");
        $q->bindParam("org", $org);
        if(!$q->execute()) {echo 500; die;}
        $not_accepted = $q->fetchAll(PDO::FETCH_ASSOC);

        $q = $pdo->prepare("SELECT email FROM users WHERE org_id = :org and accepted = 1");
        $q->bindParam("org", $org);
        if(!$q->execute()) {echo 500; die;}
        $accepted = $q->fetchAll(PDO::FETCH_ASSOC);

        $data = ["not_accepted" => $not_accepted, "accepted" => $accepted];
        echo json_encode($data);
    }
}