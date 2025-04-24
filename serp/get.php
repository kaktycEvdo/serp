<?php
require_once "connect_to_db.php";
include_once "org.php";

if(!isset($_GET['item']) || !isset($_GET['command'])) {echo 504; die;}

if(!isset($_GET['user_id'])) {echo 403; die();}
if(!getAcception($pdo, $_GET['user_id'])) {echo 403; die();}

$item = $_GET['item'];
//get / getAll
$command = $_GET['command'];
switch($item){
    case 'everything':{
        if($command == 'getAll'){
            $org = getOrg($pdo, $_GET['user_id']);

            $q = $pdo->prepare("SELECT id, name, description, amount, income, consumption, safestock, price FROM resources WHERE org_id = :org");
            $q->bindParam("org", $org);
            if(!$q->execute()) {echo 500; die;}
            $resources = $q->fetchAll(PDO::FETCH_ASSOC);

            $q = $pdo->prepare("SELECT warehouse.id as id, warehouse.name as name, warehouse.description as description, address, resources.name as resources_name, resources.amount as resources_amount FROM warehouse, resources, supplied_resource WHERE supplied_resource.warehouse_id = warehouse.id and supplied_resource.resources_id = resources.id and warehouse.org_id = :org");
            $q->bindParam("org", $org);
            if(!$q->execute()) {echo 500; die;}
            $warehouses = $q->fetchAll(PDO::FETCH_ASSOC);

            $q = $pdo->prepare("SELECT listing, name, description FROM goal WHERE org_id = :org");
            $q->bindParam("org", $org);
            if(!$q->execute()) {echo 500; die;}
            $goals = $q->fetchAll(PDO::FETCH_ASSOC);

            $data = ["resources" => $resources, "warehouses" => $warehouses, "goals" => $goals];
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
    // currently deprecated for optimisational reasons
    // case 'resources':{
    //     if($command == 'get'){
    //         $q = $pdo->prepare("SELECT * FROM resources WHERE id = :id");
    //         $q->bindParam("id", $_GET['id']);
    //         if(!$q->execute()) {echo 500; die;}
    //         $resource = $q->fetch(PDO::FETCH_ASSOC);
    //         echo json_encode($resource);
    //     }
    //     else if($command == 'getAll'){
    //         $q = $pdo->prepare("SELECT * FROM resources");
    //         if(!$q->execute()) {echo 500; die;}
    //         $resources = $q->fetchAll(PDO::FETCH_ASSOC);
    //         echo json_encode($resources);
    //     }
    //     else{
    //         echo 504;
    //     }
    //     break;
    // }
    // case 'warehouses':{
    //     if($command == 'get'){
    //         $q = $pdo->prepare("SELECT warehouse.id as id, warehouse.name as name, warehouse.description as description, adress, resources.name as resources_name, resources.amount as resources_amount FROM warehouse LEFT JOIN resources ON warehouse.resources_id = resources.id WHERE warehouse.id = :id");
    //         $q->bindParam("id", $_GET['id']);
    //         if(!$q->execute()) {echo 500; die;}
    //         $warehouse = $q->fetch(PDO::FETCH_ASSOC);
    //         echo json_encode($resource);
    //     }
    //     else if($command == 'getAll'){
    //         $q = $pdo->prepare("SELECT warehouse.id as id, warehouse.name as name, warehouse.description as description, adress, resources.name as resources_name, resources.amount as resources_amount FROM warehouse LEFT JOIN resources ON warehouse.resources_id = resources.id");
    //         if(!$q->execute()) {echo 500; die;}
    //         $warehouses = $q->fetchAll(PDO::FETCH_ASSOC);
    //         echo json_encode($warehouses);
    //     }
    //     else{
    //         echo 504;
    //     }
    //     break;
    // }
    // case 'suppliers':{
    //     if($command == 'get'){
    //         $q = $pdo->prepare("SELECT company.name, company.description, company.workhours, company.adress, resources.name, warehouse.name FROM supplier RIGHT JOIN company ON supplier.company_id = company.id RIGHT JOIN resources ON supplier.resources_id = resources.id RIGHT JOIN warehouse ON supplier.warehouse_id = warehouse.id WHERE id = :id");
    //         $q->bindParam("id", $_GET['id']);
    //         if(!$q->execute()) {echo 500; die;}
    //         $supplier = $q->fetch(PDO::FETCH_ASSOC);
    //         echo json_encode($supplier);
    //     }
    //     else if($command == 'getAll'){
    //         $q = $pdo->prepare("SELECT company.name, company.description, company.workhours, company.adress, resources.name, warehouse.name FROM supplier RIGHT JOIN company ON supplier.company_id = company.id RIGHT JOIN resources ON supplier.resources_id = resources.id RIGHT JOIN warehouse ON supplier.warehouse_id = warehouse.id");
    //         if(!$q->execute()) {echo 500; die;}
    //         $suppliers = $q->fetchAll(PDO::FETCH_ASSOC);
    //         echo json_encode($suppliers);
    //     }
    //     else{
    //         echo 504;
    //     }
    //     break;
    // }
}