<?php
include_once "model.php";

final class Resource extends Model{
    public function __construct() {
        $this->name = "resource_info";
        $this->fields = ["name", "description", "safestock", "type", "org_id"];
        $this->field_titles = ["id" => "id", "name" => "Наименование", "description" => "Описание", "safestock" => "\"Подушка безопасности\"", "type" => "Тип ресурса", "org_id" => "Код организации", "amount" => "Общее количество"];
    }
}