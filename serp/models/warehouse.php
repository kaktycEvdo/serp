<?php
include_once "model.php";

final class Warehouse extends Model{
    public function __construct() {
        $this->name = "warehouse";
        $this->fields = ["name", "description", "address", "org_id"];
        $this->field_titles = ["id" => "id", "name" => "Наименование", "description" => "Описание", "address" => "Адрес", "org_id" => "Код организации"];
    }
}