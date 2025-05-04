<?php

/**
 * Model abstract class for making Resources, Warehouses and other models easier to manage.
 * Works with PDO and automatically uses INSERT, SELECT, DROP and UPDATE statements with methods.
 */
class Model
{
    protected string $name;
    public $fields;
    protected $required_fields;
    protected $field_titles;

    public function getIf(PDO $pdo, string $statement, array $values = null, bool $singular = false){
        $fields_str = implode(", ", $this->fields);
        $q = $pdo->prepare("SELECT id, $fields_str FROM $this->name WHERE $statement");
        if($values){
            foreach ($values as $param => $value) {
                $q->bindParam($param, $value);
            }
        }
        $q->execute();

        $obj = $singular ? $q->fetch(PDO::FETCH_OBJ) : $q->fetchAll(PDO::FETCH_OBJ);
        if(!$singular){
            for($i = 0; $i < sizeof($obj); $i++){
                $obj[$i]->field_titles = $this->field_titles;
                $obj[$i]->db_title = $this->name;
            }
        }

        return $obj;
    }

    public function post(PDO $pdo, array $values)
    {
        if (array_diff(array_keys($values), $this->fields)) {
            return [1, "Ошибка: набор значений не соответствует полям модели."];
        }

        $fields_str = implode(", ", $this->fields);
        $params_str = implode(", :", $this->fields);
        
        $params_str = ":$params_str";

        $q = $pdo->prepare("INSERT INTO $this->name($fields_str) VALUES($params_str)");
        foreach ($this->fields as $field) {
            $q->bindParam($field, $values[$field]);
        }

        if(!$q->execute()) return [1, "Произошла ошибка при выполнении POST-запроса для $this->name"];

        return [0, "Успешный POST-запрос для $this->name."];
    }

    public function put(PDO $pdo, array $values, int $id){
        if (array_diff(array_keys($values), $this->fields)) {
            return [1, "Ошибка: набор значений не соответствует полям модели."];
        }

        $fields_str = "";
        for($i = 0; $i < sizeof($this->fields); $i++){
            // don't add comma if it's the last element in param list
            $fields_str .= $this->fields[$i]." = :".$this->fields[$i].($i + 1 != sizeof($this->fields) ? ", " : null);
        }

        $q = $pdo->prepare("UPDATE $this->name SET $fields_str WHERE id = :id");

        foreach ($this->fields as $field) {
            $q->bindParam($field, $values[$field]);
        }
        $q->bindParam("id", $id);
        
        if(!$q->execute()) return [1, "Произошла ошибка при выполнении PUT-запроса для $this->name"];

        return [0, "Успешный PUT-запрос для $this->name."];
    }

    public function putAccurate(PDO $pdo, array $values, array $keys, int $id){
        if (array_diff(array_keys($values), $keys)) {
            return [1, "Ошибка: набор значений не соответствует полям модели."];
        }

        $fields_str = "";
        for($i = 0; $i < sizeof($keys); $i++){
            // don't add comma if it's the last element in param list
            $fields_str .= $keys[$i]." = :".$keys[$i].($i + 1 != sizeof($keys) ? ", " : null);
        }

        $q = $pdo->prepare("UPDATE $this->name SET $fields_str WHERE id = :id");

        foreach ($keys as $field) {
            $q->bindParam($field, $values[$field]);
        }
        $q->bindParam("id", $id);
        
        if(!$q->execute()) return [1, "Произошла ошибка при выполнении PUT-запроса для $this->name"];

        return [0, "Успешный PUT-запрос для $this->name."];
    }
}