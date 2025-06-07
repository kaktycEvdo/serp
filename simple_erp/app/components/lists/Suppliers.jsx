import Item from "../UI/Item";

export default function Suppliers({ suppliers, setThing, open, changeForm, changeOpenedF }) {
  return (
    <>
      <h2 className="text-center col-start-1 md:col-end-2 lg:col-end-4">
        Поставщики
      </h2>
      {suppliers ? (
        suppliers.length > 0 ? (
          suppliers.map((supplier, index) => {
            return (
              <Item
                key={"g" + index}
                onClick={() => {
                  setThing(supplier);
                  changeForm(2);
                  open();
                }
                }
              >
                <div>Наименование: {supplier["name"]}</div>
                <div>
                  Описание:{" "}
                  {supplier["description"] != ""
                    ? supplier["description"]
                    : "У данного поставщика нет описания."}
                </div>
              </Item>
            );
          })
        ) : (
          null
        )
      ) : (
        <>Загрузка...</>
      )}
    </>
  );
}
