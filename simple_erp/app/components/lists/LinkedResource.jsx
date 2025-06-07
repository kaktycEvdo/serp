import Cell from "../UI/Cell";

export default function LinkedResource({ resource, setThing, open, changeForm }) {
  function getDaysUntilSafestock(resource) {
    let days = 0;
    let dynamic = resource["consumption"] - resource["income"];
    let total_amount = resource["amount"];
    while (total_amount != resource["safestock"]) {
      total_amount -= dynamic;
      days++;
    }
    return days;
  }
  function showType(type) {
    switch (type) {
      case 0:
        return "шт.";
      case 1:
        return "л.";
      case 2:
        return "кг.";
      case 3:
        return "уп.";
    }
  }

  return (
    <Cell
      onClick={() => {
        setThing(resource);
        changeForm(4);
        open();
      }}
      additional_classes={"link_resource"+resource['id']}
    >
      <div>Наименование: {resource['resource']["name"]}</div>
      <div>Количество: {resource["amount"]+showType(resource['resource']['type'])}</div>
      <div>Цена: {resource["price"]}руб.</div>
    </Cell>
  );
}
