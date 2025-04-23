<?php
require_once "models/user.php";
require_once "checking_module.php";

// should be one, but could be multiple through ", "
$allowed_url = 'http://localhost:5173';

header("Access-Control-Allow-Origin: $allowed_url", true);

if(!isset($_POST['command'])) {echo 504; die;}
$command = $_POST['command'];
switch($command){
    case 'auth':{
        $post = $_POST;
        $user = User::auth($post['email'], $post['password'], $pdo);
        $_SESSION['user'] = serialize($user);
        echo $post['email'];
        break;
    }
    case 'reg':{
        $post = $_POST;
        $user = User::register($post['email'], $post['password'], $pdo);
        $_SESSION['user'] = serialize($user);
        echo $post['email'];
        break;
    }
}