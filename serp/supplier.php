<?php
require_once "connect_to_db.php";

// should be one, but could be multiple through ", "
$allowed_url = 'http://localhost:5173';

header("Access-Control-Allow-Origin: $allowed_url", true);

if(!isset($_SESSION['user']) || !isset($_SESSION['org']) || !isset($_SESSION['role']) || !isset($_SESSION['accepted'])) {echo 403; die();}
if($_SESSION['accepted'] != 1){echo 403; die();}

if(!isset($_POST['command'])) {echo 504; die;}
$command = $_POST['command'];
switch($command){
    case 'add':{
        $post = $_POST;
        $q = $pdo->prepare("INSERT INTO company(name, description, workhours, adress) VALUES(:name, :description, :workhours, :address)");
        if($post['workhours'] == '') $post['workhours'] = '07:00-21:00';
        $q->bindParam("name", $post['name']);
        $q->bindParam("description", $post['description']);
        $q->bindParam("address", $post['address']);
        $q->bindParam("workhours", $post['workhours']);
        if(!$q->execute()) {echo 500; die;}
        $company_id = $pdo->lastInsertId();
        $q = $pdo->prepare("INSERT INTO supplier(company_id, resources_id, warehouse_id) VALUES(:company, :resource, :warehouse)");
        $q->bindParam("company", $company_id);
        $q->bindParam("resource", $post['resource']);
        $q->bindParam("warehouse", $post['warehouse']);
        if(!$q->execute()) {echo 500; die;}
        echo 200;
        break;
    }
    case 'edit':{
        $post = $_POST;
        $q = $pdo->prepare("UPDATE company SET name = :name, description = :description, workhours = :workhours, adress = :address) WHERE id = :id");
        $q->bindParam("id", $post['id']);
        if($post['workhours'] == '') $post['workhours'] = '07:00-21:00';
        $q->bindParam("name", $post['name']);
        $q->bindParam("description", $post['description']);
        $q->bindParam("address", $post['address']);
        $q->bindParam("workhours", $post['workhours']);
        if(!$q->execute()) {echo 500; die;}
        $q = $pdo->prepare("UPDATE supplier SET resources_id = :resource, warehouse_id = :warehouse WHERE company_id = :company");
        $q->bindParam("company", $post['id']);
        $q->bindParam("resource", $post['resource']);
        $q->bindParam("warehouse", $post['warehouse']);
        if(!$q->execute()) {echo 500; die;}
        echo 200;
        break;
    }
    case 'remove':{
        $post = $_POST;
        $q = $pdo->prepare("DELETE FROM company WHERE id = :id");
        $q->bindParam("id", $post['id']);
        if(!$q->execute()) {echo 500; die;}
        echo 200;
        break;
    }
}