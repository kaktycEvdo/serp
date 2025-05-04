export default function CreateWarehouseForm({ url, axios, close, thing }) {
  return (
    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
      <h3 className="modal-title text-base font-semibold text-gray-900">
        Добавление склада
      </h3>
      <form
        className="grid grid-cols-2 gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          close();
          let fields = document.querySelectorAll("input.wf, textarea.wf");
          let body = {
            mode: "cors",
            name: fields[0].value,
            description: fields[1].value,
            address: fields[2].value,
            item: "warehouse",
            user_id: localStorage.getItem("user"),
          }
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
        <label htmlFor="wf_name">Наименование</label>
        <input
          type="text"
          className="wf bg-white text-black border-2 border-black"
          name="name"
          id="wf_name"
          defaultValue={thing ? thing['name'] : null}
        />
        <label htmlFor="wf_description">Описание</label>
        <textarea
          className="wf bg-white text-black border-2 border-black"
          name="description"
          id="wf_description"
          defaultValue={thing ? thing['description'] : null}
        ></textarea>
        <label htmlFor="wf_address">Адрес</label>
        <input
          type="text"
          className="wf bg-white text-black border-2 border-black"
          name="address"
          id="wf_address"
          defaultValue={thing ? thing['address'] : null}
        />
        <div className="px-4 py-3 sm:flex sm:flex-row justify-center sm:px-6 col-start-1 col-end-3">
          <input
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-800 sm:w-auto"
            value={"Создать"}
          />
        </div>
      </form>
    </div>
  );
}
