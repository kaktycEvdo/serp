import Cell from "../UI/Cell";

export default function LinkedWarehouse({
  warehouse,
  setThing,
  open,
  changeForm,
}) {
  return (
    <Cell
      onClick={() => {
        setThing(warehouse);
        changeForm(1);
        open();
      }}
    >
      <div>Наименование: {warehouse["name"]}</div>
      <div>
        Описание:{" "}
        {warehouse["description"] != ""
          ? warehouse["description"]
          : "У данного склада нет описания."}
      </div>
    </Cell>
  );
}
