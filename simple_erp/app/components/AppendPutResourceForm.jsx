import axios from "axios";

export default function AppendPutResourceForm({
  warehouses,
  suppliers,
  resources,
  thing,
  close,
  url,
}) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <label htmlFor="rlf_name">Ресурс:</label>
        <select
          name="rlf_resource"
          id="rlf_name"
          defaultValue={thing ? thing["resources_id"] : 0}
        >
          {resources ? (
            resources.map((resource, index) => {
              return (
                <option key={"rlfr_" + index} value={resource["id"]}>
                  {resource["name"]}
                </option>
              );
            })
          ) : (
            <option>Нет ресурсов для связи</option>
          )}
        </select>
        <label htmlFor="rlf_amount">Поставляемое/производимое количество</label>
        <input
          type="number"
          defaultValue={thing ? thing["amount"] : 0}
          max={100000000}
          min={0}
          className="rlf bg-white text-black border-2 border-black"
          name="amount"
          id="rlf_amount"
        />
        <label htmlFor="rlf_price">Цена</label>
        <input
          type="number"
          defaultValue={thing ? thing["price"] : 0}
          max={10000000000}
          min={0}
          className="rlf bg-white text-black border-2 border-black"
          name="price"
          id="rlf_price"
        />
        <div className="col-start-1 col-end-3 grid grid-cols-2 justify-center items-center">
          <h2 className="col-start-1 col-end-3">В складе:</h2>
          {warehouses.length > 0 ? (
            warehouses.map((warehouse, key) => {
              return (
                <div key={"rl_" + key}>
                  <label htmlFor={"warehouse_id" + key}>
                    {warehouse["name"]}
                  </label>
                  <input
                    defaultChecked={
                      thing ? thing["warehouse_id"] == warehouse["id"] : false
                    }
                    type="radio"
                    className="rlf_warehouse"
                    name="warehouse_id"
                    id={"warehouse_id" + key}
                    key={"ro" + key}
                    value={warehouse["id"]}
                  />
                </div>
              );
            })
          ) : (
            <div>Нет складов</div>
          )}
        </div>
        <div className="col-start-1 col-end-3 grid grid-cols-2 justify-center items-center">
          <h2 className="col-start-1 col-end-3">Поставляется:</h2>
          {suppliers.length > 0 ? (
            suppliers.map((supplier, key) => {
              return (
                <div key={"rlc_" + key}>
                  <label htmlFor={"supplier_id" + key}>
                    {supplier["name"]}
                  </label>
                  <input
                    defaultChecked={
                      thing ? thing["supplier"] == supplier["id"] : false
                    }
                    type="radio"
                    className="rlf_supplier"
                    name="supplier_id"
                    id={"supplier_id" + key}
                    key={"ro" + key}
                    value={supplier["id"]}
                  />
                </div>
              );
            })
          ) : (
            <div>Нет поставщиков</div>
          )}
          <div className="px-4 py-3 sm:flex sm:flex-row justify-center sm:px-6 col-start-1 col-end-3">
            <input
              type="submit"
              className="inline-flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-800 sm:w-auto"
              value={thing ? "Изменить" : "Связать"}
              onClick={() => {
                let fields = document.querySelectorAll(
                  "#rlf_amount, #rlf_price"
                );
                let checked_wr = document.querySelector(
                  "input.rlf_warehouse:checked"
                ).value;
                let checked_sp = document.querySelector(
                  "input.rlf_supplier:checked"
                ).value;
                let resource = document.querySelector("select#rlf_name").value;
                let body = {
                  mode: "cors",
                  resources_id: resource,
                  supplier: checked_sp ? checked_sp : null,
                  warehouse_id: checked_wr,
                  amount: fields[0].value,
                  price: fields[1].value,
                  user_id: localStorage.getItem("user"),
                  item: "resource",
                };
                let options = {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                };
                if (thing) {
                  body.item_id = thing["id"];
                  axios
                    .put(url, body, options)
                    .then((res) => console.log(res.data));
                } else {
                  axios
                    .post(url, body, options)
                    .then((res) => console.log(res.data));
                }

                close();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
