<?php
include_once "model.php";

final class ResourceLink extends Model{
    public function __construct() {
        $this->name = "resource";
        $this->fields = ["resources_id", "supplier", "amount", "price", "warehouse_id"];
        $this->field_titles = ["id" => "id", "resource_name" => "Наименование ресурса", "amount" => "Количество", "price" => "Цена"];
    }
}