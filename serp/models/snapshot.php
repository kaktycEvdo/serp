<?php
include_once "model.php";

final class Snapshot extends Model{
    public function __construct() {
        $this->name = "snapshot";
        $this->fields = ["listing", "org_id"];
        $this->field_titles = ["id" => "id", "listing" => "Листинг", "org_id" => "Код организации"];
    }
}