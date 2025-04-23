<?php
require_once "connect_to_db.php";

class Resource{
    private int $id;
    public string $name;
    public string $description;
    public string $image;

    public function setImage(){
        if(!is_dir('static/user/resource_images/')){
            mkdir('static/user/resource_images/');
        }
    }
}