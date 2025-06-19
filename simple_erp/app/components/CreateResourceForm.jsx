import axios from "axios";
import ModalInputButton from "./UI/ModalInputButton";

export default function CreateResourceForm({ url, close, thing }) {
  return (
    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
      <h3 className="modal-title text-base font-semibold text-gray-900">
        {thing ? "Изменение ресурса" : "Добавление ресурса"}
      </h3>
      <form
        className="grid grid-cols-2 gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          close();
          let rf_fields = document.querySelectorAll("input.rf, textarea.rf");
          let body = {
            mode: "cors",
            name: rf_fields[0].value,
            description: rf_fields[1].value,
            safestock: rf_fields[2].value,
            type: rf_fields[3].value,
            item: "resource_info",
            user_id: localStorage.getItem("user"),
          };
          let options = {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          };
          if (thing !== null) {
            body.item_id = thing["id"];
            axios.put(url, body, options);
          } else {
            axios.post(url, body, options);
          }
        }}
      >
        <label htmlFor="rf_name">Наименование</label>
        <input
          type="text"
          className="rf bg-white text-black border-2 border-black"
          name="name"
          id="rf_name"
          defaultValue={thing !== null ? thing["name"] : null}
        />
        <label htmlFor="rf_description">Описание</label>
        <textarea
          className="rf bg-white text-black border-2 border-black"
          name="description"
          id="rf_description"
          defaultValue={thing !== null ? thing["description"] : null}
        ></textarea>
        <label htmlFor="rf_safestock">"Подушка безопасности"</label>
        <input
          type="number"
          defaultValue={thing !== null ? thing["safestock"] : 0}
          max={100000000}
          min={0}
          className="rf bg-white text-black border-2 border-black"
          name="safestock"
          id="rf_safestock"
        />
        <div className=" col-start-1 col-end-3">
          <h2>Тип ресурса</h2>
          <div>
            <label htmlFor="rf_type_s">Штучный (шт.)</label>
            <input
              type="radio"
              className="rf"
              name="type"
              id="rf_type_s"
              value={0}
              defaultChecked={thing ? thing["type"] === 0 : true}
            />
          </div>
          <div>
            <label htmlFor="rf_type_l">Жидкостный (л.)</label>
            <input
              type="radio"
              className="rf"
              name="type"
              id="rf_type_l"
              value={1}
              defaultChecked={thing ? thing["type"] === 1 : false}
            />
          </div>
          <div>
            <label htmlFor="rf_type_k">Сыпчатый (кг.)</label>
            <input
              type="radio"
              className="rf"
              name="type"
              id="rf_type_k"
              value={2}
              defaultChecked={thing ? thing["type"] === 2 : false}
            />
          </div>
          <div>
            <label htmlFor="rf_type_p">Упаковка (уп.)</label>
            <input
              type="radio"
              className="rf"
              name="type"
              id="rf_type_p"
              value={3}
              defaultChecked={thing ? thing["type"] === 3 : false}
            />
          </div>
        </div>
        <div className="px-4 py-3 sm:flex sm:flex-row justify-center sm:px-6 col-start-1 col-end-3">
          <ModalInputButton
            type="submit"
            color={"emerald"}
            title={"Создать"}
          />
        </div>
      </form>
    </div>
  );
}
