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
              <div
                key={"g" + index}
                className="grid h-full p-5 justify-center items-center text-center dark:bg-emerald-950 hover:cursor-pointer rounded-md"
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
              </div>
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
