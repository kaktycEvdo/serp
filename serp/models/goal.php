<?php
include_once "model.php";

final class Goal extends Model{
    public function __construct() {
        $this->name = "goal";
        $this->fields = ["listing", "name", "description", "deadline", "org_id"];
        $this->field_titles = ["id" => "id", "listing" => "Листинг", "name" => "Наименование", "description" => "Описание", "deadline" => "Дата окончания действия", "org_id" => "Код организации"];
    }
}