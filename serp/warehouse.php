<?php
require_once "connect_to_db.php";
include_once "org.php";

// should be one, but could be multiple through ", "
$allowed_url = 'http://localhost:5173';

header("Access-Control-Allow-Origin: $allowed_url", true);

if(!isset($_POST['user_id'])){echo 403; die();}
if(!getAcception($pdo, $_POST['user_id'])){echo 403; die();}

if(!isset($_POST['command'])) {echo 504; die;}
$command = $_POST['command'];
switch($command){
    case 'add':{
        $post = $_POST;
        $org = getOrg($pdo, $post['user_id']);
        if(!isset($post['supplier'])){
            $post['supplier'] = null;
        }

        $q = $pdo->prepare("INSERT INTO warehouse(name, description, address, org_id) VALUES(:name, :description, :address, :org)");
        $q->bindParam("name", $post['name']);
        $q->bindParam("description", $post['description']);
        $q->bindParam("address", $post['address']);
        $q->bindParam("org", $org);
        if(!$q->execute()) {echo 500; die;}
        $w_id = $pdo->lastInsertId('warehouse');

        $q = $pdo->prepare("INSERT INTO supplied_resource(resources_id, warehouse_id, company_id) VALUES(:resource, $w_id, :company)");
        $q->bindParam("resource", $post['resource_id']);
        $q->bindParam("company", $post['supplier']);
        if(!$q->execute()) {echo 500; die;}
        echo 200;
        break;
    }
    case 'edit':{
        $post = $_POST;
        $q = $pdo->prepare("UPDATE warehouse SET (name = :name, description = :description, address = :address, resources_id = :resource)");
        $q->bindParam("name", $post['name']);
        $q->bindParam("description", $post['description']);
        $q->bindParam("address", $post['address']);
        $q->bindParam("resource", $post['resource']);
        if(!$q->execute()) {echo 500; die;}
        echo 200;
        break;
    }
    case 'remove':{
        $post = $_POST;
        $q = $pdo->prepare("DELETE FROM warehouse WHERE id = :id");
        if(!$q->execute()) {echo 500; die;}
        echo 200;
        break;
    }
}