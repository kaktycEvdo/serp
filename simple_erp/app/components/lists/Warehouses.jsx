import AnalyticsButton from "../UI/AnalyticsButton";

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
              <div
                key={"g" + index}
                onClick={() => {
                  setThing(warehouse);
                  changeForm(1);
                  open();
                }}
                className="grid h-full p-5 justify-center items-center text-center dark:bg-emerald-950 hover:cursor-pointer rounded-md"
              >
                <div>Наименование: {warehouse["name"]}</div>
                <div>
                  Описание: {warehouse["description"] != ""
                    ? warehouse["description"]
                    : "У данного склада нет описания."}
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
