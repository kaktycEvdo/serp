import axios from "axios";

function returnType(type) {
  switch (type) {
    case 0: {
      return "шт.";
    }
    case 1: {
      return "л.";
    }
    case 2: {
      return "кг.";
    }
    case 3: {
      return "уп.";
    }
  }
}
function returnTypeFull(type) {
  switch (type) {
    case 0: {
      return "Штучный (шт.)";
    }
    case 1: {
      return "Жидкостный (л.)";
    }
    case 2: {
      return "Сыпчатый (кг.)";
    }
    case 3: {
      return "Упаковка (уп.)";
    }
  }
}
function getObjectById(array, id) {
  let res = null;
  let ar = array;
  ar.forEach((element) => {
    if (element["id"] == id) {
      res = element;
    }
  });
  return res;
}

export default function DetailsModal({ thing, url, editOpen, close, data }) {
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
                        Тип: {returnTypeFull(thing["type"])}
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
                        {returnType(thing["resource"]["type"])}
                      </div>
                    );
                  case "listing":
                    let listing = JSON.parse(thing[key]);
                    return (
                      <div key={"d" + index} className="grid grid-flow-col">
                        <h3>Требуется: </h3>
                        <div>
                          {Object.keys(listing).map((item_id, i) => {
                            let resource = getObjectById(
                              data["resources"],
                              item_id
                            );
                            return (
                              <div key={"dl" + i}>
                                {resource["name"]}: {listing[item_id]}
                                {returnType(resource["type"])}
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
          <div
            className="hover:cursor-pointer bg-amber-600 p-2 rounded-md text-white"
            onClick={() => {editOpen(); close()}}
          >
            Изменить
          </div>
          <div
            className="hover:cursor-pointer bg-red-700 p-2 rounded-md text-white"
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
          >
            Удалить
          </div>
        </div>
      </div>
    </div>
  );
}
