import axios from "axios";
import { useState } from "react";

export default function CheckForm({ close, data, url }) {
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
  function sendRequest(listing) {
    let body = {
      mode: "cors",
      listing: listing,
      user_id: localStorage.getItem("user"),
      item: "snapshot",
    };
    let options = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    axios.post(url, body, options).then((res) => console.log(res.data));
  }
  let listing = {};
  return (
    <div className="max-h-11/12">
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
        <h3 className="modal-title text-base font-semibold text-gray-900">
          Ежедневный отчет
        </h3>
      </div>
      <div className="">
        {data["resource_links"] ? (
          Object.keys(data["resource_links"]["supplied"]).map((supplier_id) => {
            let supplier = getObjectById(data["companies"], supplier_id);
            return (
              <div key={"cs_" + supplier_id}>
                <h3>{supplier.name} поставили:</h3>
                <div>
                  {data["resource_links"]["supplied"][supplier_id] ? (
                    Object.keys(
                      data["resource_links"]["supplied"][supplier_id]
                    ).map((warehouse_id, index) => {
                      let warehouse = getObjectById(
                        data["warehouses"],
                        warehouse_id
                      );
                      return (
                        <div
                          className="flex flex-col gap-5 m-2"
                          key={"cr_" + index}
                        >
                          {data["resource_links"]["supplied"][supplier_id][
                            warehouse_id
                          ].map((resource) => {
                            let [amount, setAmount] = useState(0);
                            let [price, setPrice] = useState(0);
                            if(!listing[resource['resource_name']]) listing[resource['resource_name']] = { amount: amount/1, price: price/1, supplier: supplier_id, warehouse: warehouse_id };
                            else {
                              let og_listing = listing[resource['resource_name']];
                              listing[resource['resource_name']] = { amount: og_listing.amount/1 + amount/1, price: (og_listing.price/1 + price/1)/2, supplier: supplier_id, warehouse: warehouse_id };
                            }
                            return (
                              <div className="grid grid-cols-2">
                                <label htmlFor={resource["id"]}>
                                  {resource["resource"]["name"]} в склад "
                                  {warehouse.name}"
                                </label>
                                <div className="flex flex-col">
                                  <div>
                                    <input
                                      className="border-2 border-black p-1 resource_amount"
                                      type="number"
                                      max={1000000}
                                      id={"amount" + resource["id"]}
                                      value={amount}
                                      onChange={(e) =>
                                        setAmount(e.target.value)
                                      }
                                    />
                                    {showType(resource["resource"]["type"])}
                                  </div>
                                  <div>
                                    за{" "}
                                    <input
                                      className="border-2 border-black p-1 resource_price"
                                      type="number"
                                      max={10000000000}
                                      id={"price" + resource["id"]}
                                      value={price}
                                      onChange={(e) => setPrice(e.target.value)}
                                    />
                                    руб.
                                  </div>
                                  <div>
                                    для{" "}
                                    <div>
                                      {data["goals"].map((goal, index) => {
                                        let [checked, changeChecked] =
                                          useState(false);
                                        const  [splitAmount, setSplitAmount] = useState(amount);
                                        listing[resource['resource_name']]['goal'+goal['id']] = checked ? {id: goal['id'], amount: splitAmount} : null;
                                        return (
                                          <div key={"gil" + goal["id"]}>
                                            <label htmlFor={"goal" + index + warehouse_id + supplier_id}>
                                              {goal["name"]}
                                            </label>
                                            <input
                                              type="checkbox"
                                              id={"goal" + index + warehouse_id + supplier_id}
                                              checked={checked}
                                              onChange={(e) => {
                                                changeChecked(e.target.checked);
                                              }}
                                            />
                                            <input
                                              type="number"
                                              value={splitAmount}
                                              max={amount}
                                              split={checked.toString()}
                                              className={
                                                checked
                                                  ? "goal" + goal["id"] +" resource"+ resource['id'] + " bg-white w-full text-black border-2 border-black " +
                                                    ("g_" + goal["id"])
                                                  : "hidden"
                                              }
                                              onChange={(e) => {
                                                if (e.target.value / 1 <= amount) setSplitAmount(e.target.value);
                                                else setSplitAmount(amount);
                                              }}
                                            />
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })
                  ) : (
                    <>Нету связей для заполнения.</>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <>Нету ресурсов для составления отчета</>
        )}
      </div>
      <div className="px-4 py-3 sm:flex sm:flex-row-reverse justify-center sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-800 sm:ml-3 sm:w-auto"
          onClick={() => {
            close();
            sendRequest(listing);
          }}
        >
          Отправить
        </button>
      </div>
    </div>
  );
}
