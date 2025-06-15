import axios from "axios";
import ModalButton from "./UI/ModalButton";

function returnType(type, full = false) {
  switch (type) {
    case 0:
      return full ? "Штучный" : "шт.";
    case 1:
      return full ? "Жидкий" : "л.";
    case 2:
      return full ? "Сыпчатый" : "кг.";
    case 3:
      return full ? "Упаковка" : "уп.";
  }
}
export default function DetailsModal({ thing, url, editOpen, close }) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-center">Подробно</h2>
      <div>
        {thing ? (
          <div className="text-center">
            {Object.keys(thing["field_titles"]).map((key, index) => {
              if (
                typeof thing[key] !== "object" &&
                key != "org_id" &&
                key != "id"
              ) {
                switch (key) {
                  case "type":
                    return (
                      <div key={"d" + index}>
                        Тип: {returnType(thing["type"], true)}
                      </div>
                    );
                  case "safestock":
                  case "income":
                  case "consumption":
                    return (
                      <div key={"d" + index}>
                        {thing["field_titles"][key]}: {thing[key]}
                        {returnType(thing["type"])}
                      </div>
                    );
                  case "price":
                    return (
                      <div key={"d" + index}>
                        {thing["field_titles"][key]}: {thing[key]}руб.
                      </div>
                    );
                  case "amount":
                    return (
                      <div key={"d" + index}>
                        {thing["field_titles"][key]}: {thing[key]}
                        {returnType(thing["type"])}
                      </div>
                    );
                  case "listing":
                    let listing = JSON.parse(thing[key]);
                    return (
                      <div key={"d" + index} className="grid grid-flow-row m-2">
                        <h3>Требуется: </h3>{" "}
                        <div className="flex flex-col">
                          {Object.keys(listing).map((item_id, i) => {
                            return (
                              <div key={"dl" + i}>
                                {item_id}: {listing[item_id]}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  default:
                    return (
                      <div key={"d" + index}>
                        {thing["field_titles"][key]}: {thing[key]}
                      </div>
                    );
                }
              }
            })}
          </div>
        ) : (
          <div className="text-center">Подробности не обнаружены</div>
        )}
        <div className="flex w-full justify-around">
          <ModalButton
            color={"amber"}
            title={"Изменить"}
            onClick={() => {editOpen(); close()}}
          />
          <ModalButton
            color={"red"}
            title={"Удалить"}
            onClick={() => {
              axios
                .delete(
                  url +
                    "?id=" +
                    thing["id"] +
                    "&user_id=" +
                    localStorage.getItem("user") +
                    "&item=" +
                    thing["db_title"]
                )
                .then(() => {
                  close();
                });
            }}
          />
        </div>
      </div>
    </div>
  );
}
