<?php
session_start();
require_once "connect_to_db.php";
require_once "checking_module.php";

class User{
    private int $id;
    private string $email;
    private string $password;

    public function __construct(string $email, string $password, int $id = null) {
        $this->email = $email;
        $this->password = $password;
        $this->id = $id;
    }

    public function getEmail(){
        return $this->email;
    }
    public function getPassword(){
        return $this->password;
    }
    public function getID(){
        return $this->id;
    }
    public function setEmail(string $email){
        $this->email = $email;
    }
    public function setPassword(string $password){
        $this->password = $password;
    }

    public static function auth(string $email, string $password, PDO $pdo){
        $q = $pdo->prepare("SELECT id FROM users WHERE email = :email and password = :password");
        $password = hash('sha256', $password);
        $q->bindParam('email', $email);
        $q->bindParam('password', $password);
        $q->execute();
        $id = $q->fetch()[0];
        if($id){
            return new User($email, $password, $id);
        }
        die();
    }

    public static function register(string $email, string $password, PDO $pdo){
        $q = $pdo->prepare("INSERT INTO users(email, password) VALUES (:email, :password)");
        $password = hash('sha256', $password);
        $q->bindParam('email', $email);
        $q->bindParam('password', $password);
        if(!$q->execute()) die();
        $id = $pdo->lastInsertId('users');
        if($id){
            return new User($email, $password, $id);
        }
        die();
    }
}