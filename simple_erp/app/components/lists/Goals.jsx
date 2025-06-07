import AnalyticsButton from "../UI/AnalyticsButton.jsx";
import Item from "../UI/Item.jsx";

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

export default function Goals({
  goals,
  setThing,
  changeForm,
  changeOpenedF,
  open,
  resources
}) {
  return (
    <>
      <h2 className="text-center col-start-1 md:col-end-2 lg:col-end-4">
        Цели
      </h2>
      {goals ? (
        goals.length > 0 ? (
          goals.map((goal, index) => {
            return (
              <Item
                key={"g" + index}
                onClick={() => {
                  setThing(goal);
                  changeForm(3);
                  open();
                }}
              >
                <div>Наименование: {goal["name"]}</div>
                <div>
                  Описание:{" "}
                  {goal["description"] != ""
                    ? goal["description"]
                    : "У данной цели нет описания."}
                </div>
                <div>
                  Дата окончания действия:{" "}
                  {goal["deadline"] != null ? goal["deadline"] : "Нету."}
                </div>
                <div>
                  Требует:{" "}
                  {Object.keys(JSON.parse(goal["listing"])).map((key, index) => {
                    let listing = JSON.parse(goal["listing"]);
                    return (
                      <div key={"rg_"+index}>
                        {key}:{" "}
                        {listing[key]}
                      </div>
                    );
                  })}
                </div>
              </Item>
            );
          })
        ) : null
      ) : (
        <>Загрузка...</>
      )}
      <AnalyticsButton
        open={() => changeOpenedF(true)}
        changeForm={changeForm}
        title={"Добавить цель"}
        form_id={3}
        setThing={setThing}
      />
    </>
  );
}
