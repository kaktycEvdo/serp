import axios from "axios";
import ModalInputButton from "./UI/ModalInputButton";

export default function CreateSupplierForm({ url, close, thing }) {
  return (
    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
      <h3 className="modal-title text-base font-semibold text-gray-900">
        {thing ? "Изменение поставщика" : "Добавление поставщика"}
      </h3>
      <form
        className="grid grid-cols-2 gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          close();
          let fields = document.querySelectorAll("input.sf, textarea.sf");
          let body = {
            mode: "cors",
            name: fields[0].value,
            description: fields[1].value,
            address: fields[2].value,
            workhours: fields[3].value,
            phone: fields[4].value,
            item: "company",
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
        <label htmlFor="sf_name">Наименование</label>
        <input
          type="text"
          className="sf bg-white text-black border-2 border-black"
          name="name"
          id="sf_name"
          defaultValue={thing ? thing['name'] : null}
        />
        <label htmlFor="sf_description">Описание</label>
        <textarea
          className="sf bg-white text-black border-2 border-black"
          name="description"
          id="sf_description"
          defaultValue={thing ? thing['description'] : null}
        ></textarea>
        <label htmlFor="sf_address">Адрес</label>
        <input
          type="text"
          className="sf bg-white text-black border-2 border-black"
          name="address"
          id="sf_address"
          defaultValue={thing ? thing['address'] : null}
        />
        <label htmlFor="sf_workhours">Рабочие часы (00:00-00:00)</label>
        <input
          type="text"
          className="sf bg-white text-black border-2 border-black"
          name="workhours"
          id="sf_workhours"
          defaultValue={thing ? thing['workhours'] : null}
        />
        <label htmlFor="sf_phone">Телефон для связи (+79999999999)</label>
        <input
          type="text"
          className="sf bg-white text-black border-2 border-black"
          name="phone"
          id="sf_phone"
          defaultValue={thing ? thing['phone'] : null}
        />

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
