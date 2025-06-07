import Cell from "../UI/Cell";

export default function LinkedSupplier({ supplier, setThing, changeForm, open }) {
  return (
    <Cell
      onClick={() => {
        setThing(supplier);
        changeForm(2);
        open();
      }}
    >
      <div>Наименование: {supplier["name"]}</div>
      <div>
        Описание:{" "}
        {supplier["description"] != ""
          ? supplier["description"]
          : "У данного поставщика нет описания."}
      </div>
    </Cell>
  );
}
