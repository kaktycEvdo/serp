<?php
require_once "connect_to_db.php";

$id = isset($_GET['id']) ? $_GET['id'] : null;

if(isset($_GET['command'])){
    $command = $_GET['command'];
    switch ($command) {
        case 'acception': {
            $q = $pdo->prepare("SELECT accepted FROM users WHERE id = :id");
            $q->bindParam('id', $id);
            if(!$q->execute()) {echo 504; die();}
            echo $q->fetch()[0];
            break;
        }
        case 'role': {
            $q = $pdo->prepare("SELECT role FROM users WHERE id = :id");
            $q->bindParam('id', $id);
            if(!$q->execute()) {echo 504; die();}
            echo $q->fetch()[0];
            break;
        }
    }
}

function getAcception($pdo, $id){
    $q = $pdo->prepare("SELECT accepted FROM users WHERE id = :id");
    $q->bindParam('id', $id);
    if(!$q->execute()) {echo 504; die();}
    return $q->fetch()[0];
}
function getRole($pdo, $id){
    $q = $pdo->prepare("SELECT role FROM users WHERE id = :id");
    $q->bindParam('id', $id);
    if(!$q->execute()) {echo 504; die();}
    return $q->fetch()[0];
}
function getOrg($pdo, $id){
    $q = $pdo->prepare("SELECT org_id FROM users WHERE id = :id");
    $q->bindParam('id', $id);
    if(!$q->execute()) {echo 504; die();}
    return $q->fetch()[0];
}