import AnalyticsButton from "../UI/AnalyticsButton";

export default function Resources({
  resources,
  setThing,
  open,
  changeForm,
  changeOpenedF,
}) {
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
    <>
      <h2 className="text-center col-start-1 md:col-end-2 lg:col-end-4">
        Данные о ресурсах
      </h2>
      {resources ? (
        resources.length > 0 ? (
          resources.map((resource, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setThing(resource);
                  changeForm(0);
                  open();
                }}
                className="grid h-full w-full p-5 justify-center items-center text-center dark:bg-emerald-950 hover:cursor-pointer rounded-md"
              >
                <div>Наименование: {resource["name"]}</div>
                <div>
                  Описание:{" "}
                  {resource["description"] != ""
                    ? resource["description"]
                    : "У данного ресурса нет описания."}
                </div>
                <div>"Подушка безопасности": {resource["safestock"]+showType(resource["type"])}</div>
                <div>
                  Общее количество:{" "}
                  {resource["amount"] != null
                    ? resource["amount"] + showType(resource["type"])
                    : "Неизвестно"}
                </div>
              </div>
            );
          })
        ) : null
      ) : (
        <>Загрузка...</>
      )}
      <AnalyticsButton
        open={() => changeOpenedF(true)}
        changeForm={changeForm}
        title={"Создать ресурс"}
        form_id={0}
        setThing={setThing}
      />
    </>
  );
}
