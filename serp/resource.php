<?php
require_once "checking_module.php";
require_once "connect_to_db.php";
include_once "org.php";

// should be one, but could be multiple through ", "
$allowed_url = 'http://localhost:5173';

header("Access-Control-Allow-Origin: $allowed_url", true);

if(!isset($_POST['user_id'])){echo 403; die();}
if(!getAcception($pdo, $_POST['user_id'])){echo 403; die();}

if(!isset($_POST['command'])) {echo 504; die();}
$command = $_POST['command'];
switch($command){
    case 'add':{
        $post = $_POST;
        $org = getOrg($pdo, $post['user_id']);
        $q = $pdo->prepare("INSERT INTO resources(name, description, amount, income, consumption, safestock, price, org_id) VALUES(:name, :description, :amount, :income, :consumption, :safestock, :price, :org)");
        $q->bindParam("name", $post['name']);
        $q->bindParam("description", $post['description']);
        $q->bindParam("amount", $post['amount']);
        $q->bindParam("income", $post['income']);
        $q->bindParam("consumption", $post['consumption']);
        $q->bindParam("safestock", $post['safestock']);
        $q->bindParam("price", $post['price']);
        $q->bindParam("org", $org);
        if(!$q->execute()) {echo 500; die;}
        echo 200;
        break;
    }
    case 'edit':{
        $post = $_POST;
        $q = $pdo->prepare("UPDATE resources SET (name = :name, description = :description, amount = :amount, income = :income, consumption = :consumption, safestock = :safestock, price = :price)");
        $q->bindParam("name", $post['name']);
        $q->bindParam("description", $post['description']);
        $q->bindParam("amount", $post['amount']);
        $q->bindParam("income", $post['income']);
        $q->bindParam("consumption", $post['consumption']);
        $q->bindParam("safestock", $post['safestock']);
        $q->bindParam("price", $post['price']);
        if(!$q->execute()) {echo 500; die;}
        echo 200;
        break;
    }
    case 'remove':{
        $post = $_POST;
        $q = $pdo->prepare("DELETE FROM resources WHERE id = :id");
        if(!$q->execute()) {echo 500; die;}
        echo 200;
        break;
    }
}