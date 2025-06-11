import axios from "axios";
import { useState } from "react";

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

export default function CreateGoalForm({
  url,
  close,
  resources,
  thing,
}) {
  let thing_listing = thing ? JSON.parse(thing["listing"]) : null;
  return (
    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
      <h3 className="modal-title text-base font-semibold text-gray-900">
        {thing ? "Изменение цели" : "Добавление цели"}
      </h3>
      <form
        className="grid grid-cols-2 gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          close();
          let fields = document.querySelectorAll(
            "input#gf_name, textarea#gf_description, input#gf_deadline"
          );
          let checked = document.querySelectorAll("input:checked");
          let listing = {};
          checked.forEach((element) => {
            let resource_name = element.attributes.rs.nodeValue;
            let amount = document.querySelector("input." + element.id).value;
            if (amount > 0) listing[resource_name] = amount;
          });
          let body = {
            mode: "cors",
            name: fields[0].value,
            description: fields[1].value,
            deadline: fields[2].value,
            listing: JSON.stringify(listing),
            item: "goal",
            user_id: localStorage.getItem("user"),
          };
          let options = {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          };
          if (thing) {
            body.item_id = thing["id"];
            axios.put(url, body, options);
          } else {
            axios.post(url, body, options);
          }
        }}
      >
        <label htmlFor="gf_name">Наименование</label>
        <input
          type="text"
          className="gf bg-white text-black border-2 border-black"
          name="name"
          id="gf_name"
          defaultValue={thing ? thing["name"] : null}
        />
        <label htmlFor="gf_description">Описание</label>
        <textarea
          className="gf bg-white text-black border-2 border-black"
          name="description"
          id="gf_description"
          defaultValue={thing ? thing["description"] : null}
        ></textarea>
        <label htmlFor="gf_name">Дедлайн</label>
        <input
          type="date"
          className="gf bg-white text-black border-2 border-black"
          name="deadline"
          id="gf_deadline"
          defaultValue={thing ? thing["deadline"] : null}
        />
        {resources ? (
          <div className="grid w-full lg:grid-cols-2 md:grid-cols-1 justify-between col-start-1 col-end-3">
            {resources.map((resource, index) => {
              let [checked, changeChecked] = useState(thing ? thing_listing[resource['name']] : false);
              return (
                <>
                  <div key={"r" + index} className="col-start-1 col-end-2">
                    <label htmlFor={"r_"+resource['id']}>
                      {resource["name"] +
                        " (" +
                        showType(resource["type"]) +
                        ") "}
                    </label>
                    <input
                      type="checkbox"
                      name="resources"
                      checked={checked}
                      rs={resource['name']}
                      id={"r_"+resource['id']}
                      onChange={(e) => {
                        changeChecked(e.target.checked);
                      }}
                    />
                  </div>
                  <input
                    type="number"
                    defaultValue={
                      thing_listing ? thing_listing[resource["name"]] : 0
                    }
                    className={
                      checked
                        ? "gf bg-white w-full text-black border-2 border-black "
                        + "r_"+resource['id']
                        : "hidden"
                    }
                  />
                </>
              );
            })}
          </div>
        ) : (
          <div>Нету ресурсов</div>
        )}
        <div className="px-4 py-3 sm:flex sm:flex-row justify-center sm:px-6 col-start-1 col-end-3">
          <input
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-800 sm:w-auto"
            value={thing ? "Изменить" : "Создать"}
          />
        </div>
      </form>
    </div>
  );
}
