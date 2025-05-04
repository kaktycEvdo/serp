import LinkedResource from "./lists/LinkedResource";
import AnalyticsButton from "./UI/AnalyticsButton";
import LinkedWarehouse from "./lists/LinkedWarehouse";
import LinkedSupplier from "./lists/LinkedSupplier";

export default function AnalyticsTable({
  warehouses,
  suppliers,
  resource_links,
  setThing,
  open,
  changeForm,
  changeOpenedF,
}) {
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

  return (
    <>
      {resource_links ? (
        <div className="h-fit grid md:grid-cols-1 lg:grid-cols-3 gap-5 col-start-1 sm:col-end-2 md:col-end-3 lg:col-end-3">
          <div className="grid grid-flow-col w-screen items-start gap-5 max-w-screen overflow-scroll">
            {resource_links['supplied'] ? Object.keys(resource_links["supplied"]).map((supplier_id) => {
              return (
                <table
                  key={"sp_" + supplier_id}
                  className="grid"
                  style={{ gridTemplateColumns: "1fr" }}
                >
                  <thead className="w-full flex">
                    <tr className="w-full flex">
                      <td className="w-full">
                        <LinkedSupplier
                          supplier={getObjectById(suppliers, supplier_id)}
                          setThing={setThing}
                          changeForm={changeForm}
                          open={open}
                        />
                      </td>
                    </tr>
                  </thead>
                  <tbody
                    className="grid"
                    style={{ gridTemplateColumns: "1fr" }}
                  >
                    {Object.keys(resource_links["supplied"][supplier_id]).map(
                      (warehouse_id) => {
                        return (
                          <tr
                            key={"wr_" + warehouse_id}
                            className="w-full grid grid-flow-col justify-stretch"
                          >
                            <td className="w-96 outline-1 outline-black">
                              <LinkedWarehouse
                                warehouse={getObjectById(
                                  warehouses,
                                  warehouse_id
                                )}
                                setThing={setThing}
                                changeForm={changeForm}
                                open={open}
                              />
                            </td>
                            <td className="w-full flex">
                              {resource_links["supplied"][supplier_id][
                                warehouse_id
                              ].map((resource) => {
                                return (
                                  <div
                                    key={"rlr_" + resource["id"]}
                                    className="w-full outline-1 outline-black"
                                  >
                                    <LinkedResource
                                      changeForm={changeForm}
                                      setThing={setThing}
                                      resource={resource}
                                      open={open}
                                    />
                                  </div>
                                );
                              })}
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              );
            }): <>Нет связей</>}
            
          </div>
          <div className="h-fit gap-5 row-start-3 w-screen flex justify-center">
            <AnalyticsButton
              open={() => changeOpenedF(true)}
              changeForm={changeForm}
              title={"Добавить связь"}
              form_id={4}
              setThing={setThing}
            />
          </div>
          
        </div>
      ) : (
        <>Загрузка...</>
      )}
    </>
  );
}
