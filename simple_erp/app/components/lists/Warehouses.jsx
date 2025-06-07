import AnalyticsButton from "../UI/AnalyticsButton";
import Item from "../UI/Item";

export default function Warehouses({ warehouses, setThing, open, changeForm, changeOpenedF }) {
  return (
    <>
      <h2 className="text-center col-start-1 md:col-end-2 lg:col-end-4">
        Склады
      </h2>
      {warehouses ? (
        warehouses.length > 0 ? (
          warehouses.map((warehouse, index) => {
            return (
              <Item
                key={"g" + index}
                onClick={() => {
                  setThing(warehouse);
                  changeForm(1);
                  open();
                }}
                className="grid h-full p-5 justify-center items-center text-center bg-emerald-600 dark:bg-emerald-950 hover:cursor-pointer rounded-md"
              >
                <div>Наименование: {warehouse["name"]}</div>
                <div>
                  Описание: {warehouse["description"] != ""
                    ? warehouse["description"]
                    : "У данного склада нет описания."}
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
      <AnalyticsButton
        open={() => changeOpenedF(true)}
        changeForm={changeForm}
        title={"Добавить склад"}
        form_id={1}
        setThing={setThing}
      />
    </>
  );
}
