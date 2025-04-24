<?php
require_once "checking_module.php";
require_once "connect_to_db.php";

// should be one, but could be multiple through ", "
$allowed_url = 'http://localhost:5173';

header("Access-Control-Allow-Origin: $allowed_url", true);

if(!isset($_POST['command'])) {echo 504; die;}
$command = $_POST['command'];
switch($command){
    case 'auth':{
        $post = $_POST;
        $email = $post['email'];
        $password = hash('sha256', $post['password']);
        
        $q = $pdo->prepare("SELECT id FROM users WHERE email = :email and password = :password");
        $q->bindParam('email', $email);
        $q->bindParam('password', $password);
        $q->execute();
        $res = $q->fetch();

        $id = $res[0];

        if($id){
            echo $id;
        }
        else{
            echo 500;
            die();
        }
        break;
    }
    case 'reg':{
        $post = $_POST;
        $org_id = 0;
        $role = 0;
        $accepted = 0;
        if($post['create_new_org']){
            $q = $pdo->prepare("INSERT INTO org(name) VALUES(:name)");
            $q->bindParam("name", $post['org_name']);
            if(!$q->execute()) die();
            $org_id = $pdo->lastInsertId();
            $role = 1;
            $accepted = 1;
        }
        else{
            $q = $pdo->prepare("SELECT id FROM org WHERE name = :name");
            $q->bindParam("name", $post['org_name']);
            if(!$q->execute()) die();
            $org_id = $q->fetch();
        }
        
        $q = $pdo->prepare("INSERT INTO users(email, password, org_id, role, accepted) VALUES (:email, :password, :org, $role, $accepted)");
        $password = hash('sha256', $post['password']);
        $q->bindParam('email', $post['email']);
        $q->bindParam('password', $password);
        $q->bindParam('org', $org_id);
        if(!$q->execute()) die();

        $id = $pdo->lastInsertId('users');
        if(!$id){
            echo 500;
            die();
        }
        else{
            echo $id;    
        }
        break;
    }
    case 'accept':{
        include_once "org.php";

        $post = $_POST;
        $id = $post['id'];
        $user_id = $post['user_id'];
        if (!getAcception($pdo, $user_id)){echo 403; die();};
        $q = $pdo->prepare("UPDATE users SET accepted = 1 WHERE id = :id");
        $q->bindParam("id", $id);
        if(!$q->execute()){echo 504; die();}
    }
}