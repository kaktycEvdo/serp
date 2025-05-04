<?php
include_once "model.php";

final class Company extends Model{
    public function __construct() {
        $this->name = "company";
        $this->fields = ["name", "description", "workhours", "address", "phone", "org_id"];
        $this->field_titles = ["id" => "id", "name" => "Наименование", "description" => "Описание", "workhours" => "Рабочие часы", "address" => "Адрес", "phone" => "Телефон", "org_id" => "Код организации"];
    }
}