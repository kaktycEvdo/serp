import { useEffect, useState } from "react";
import { Modal } from "../components/UI/Modal.jsx";
import axios from "axios";
import CreateResourceForm from "../components/CreateResourceForm.jsx";
import CreateWarehouseForm from "../components/CreateWarehouseForm.jsx";
import CreateSupplierForm from "../components/CreateSupplierForm.jsx";
import ReportModal from "../components/ReportModal.jsx";
import Resources from "../components/lists/Resources.jsx";
import Goals from "../components/lists/Goals.jsx";
import CreateGoalForm from "../components/CreateGoalForm.jsx";
import CheckForm from "../components/CheckForm.jsx";
import AppendPutResourceForm from "../components/AppendPutResourceForm.jsx";
import DetailsModal from "../components/DetailsModal.jsx";
import AnalyticsTable from "../components/AnalyticsTable.jsx";
import Warehouses from "../components/lists/Warehouses.jsx";
import Suppliers from "../components/lists/Suppliers.jsx";
import AnalyticsButton from "../components/UI/AnalyticsButton.jsx";
import { Popup } from "../components/UI/Popup.jsx";
import { redirect } from "react-router";
import { host } from "../host.js";

const url_get = host+"get.php?";
const url_rq = host+"general_requests.php";

export function Analytics() {
  let [data, setData] = useState(null);

  let [opened, changeOpened] = useState(false);
  let [opened_form, changeOpenedF] = useState(false);
  let [opened_accurate, changeOpenedA] = useState(false);
  const [opened_popup, changeOpenedPopup] = useState(false);
  const [status, setStatus] = useState(1);
  const [popup_content, changePopupContent] = useState(null);
  // 0 - resource, 1 - warehouse, 2 - supplier, 3 - goal
  let [form, changeForm] = useState(0);

  let [thing, setThing] = useState(null);

  function makePopup(status, text = popup_content){
    changePopupContent(text);
    setStatus(status);
    changeOpenedPopup(true);
  }

  useEffect(() => {
    axios
      .get(
        host+"org.php?command=acception&id=" + localStorage.getItem("user")
      )
      .then((res) => {
        if (res.data != 1) {
          redirect("/auth");
        }
      });
    // live reaction to changing data requires intervals of checking. 2 - seconds, 1000 - milliseconds.
    let interval = 2 * 1000;
    axios
      .get(
        url_get +
          "item=everything&command=getAll&user_id=" +
          localStorage.getItem("user"),
        { mode: "cors" }
      )
      .then((res) => {
        let result = res;
        if(result.data == 403){
          redirect("auth");
          location = 'auth';
        }
        if (result.headers.getContentType().split("; ")[0] === "text/html") {
          changePopupContent(
            "Ошибка на стороне сервера. Вывод: " + result.data
          );
          changeOpenedPopup(true);
        }
        setData(result.data);
      })
      .catch((error) => {
        if(error.message == 403){
          redirect("auth");
        }
        changePopupContent(
          "Ошибка при подключении к серверу. Вывод: " + error.message
        );
        changeOpenedPopup(true);
      })
      .then(
        setInterval(() => {
          axios
            .get(
              url_get +
                "item=everything&command=getAll&user_id=" +
                localStorage.getItem("user"),
              { mode: "cors" }
            )
            .catch((error) => {
              if(error.message == 403){
                redirect("auth");
              }
              changePopupContent(
                "Ошибка при подключении к серверу. Вывод: " + error.message
              );
              changeOpenedPopup(true);
            })
            .then((res) => {
              setData(res.data);
            });
        }, interval)
      );
  }, []);

  function renderForm() {
    if (data) {
      switch (form) {
        case 0:
          return (
            <CreateResourceForm
              url={url_rq}
              close={() => changeOpenedF(false)}
              axios={axios}
              thing={thing}
            />
          );
        case 1:
          return (
            <CreateWarehouseForm
              url={url_rq}
              close={() => changeOpenedF(false)}
              axios={axios}
              thing={thing}
            />
          );
        case 2:
          return (
            <CreateSupplierForm
              url={url_rq}
              close={() => changeOpenedF(false)}
              axios={axios}
              thing={thing}
            />
          );
        case 3:
          return (
            <CreateGoalForm
              url={url_rq}
              close={() => changeOpenedF(false)}
              axios={axios}
              resources={data["resources"] ? data["resources"] : []}
              thing={thing}
            />
          );
        case 4:
          return (
            <AppendPutResourceForm
              url={url_rq}
              close={() => changeOpenedF(false)}
              warehouses={data["warehouses"] ? data["warehouses"] : []}
              suppliers={data["companies"] ? data["companies"] : []}
              resources={data["resources"] ? data["resources"] : []}
              thing={thing}
            />
          );
        case 5:
          return (
            <CheckForm
              url={url_rq}
              close={() => changeOpenedF(false)}
              data={data}
            />
          )
        default:
          break;
      }
    } else {
      return <>Загрузка...</>;
    }
  }

  return (
    <div className="flex w-screen h-full justify-center flex-col items-center">
      <Popup opened={opened_popup} close={() => changeOpenedPopup(false)} status={status}>
        <div className="flex break-words whitespace-pre w-full overflow-auto">
          {popup_content}
        </div>
      </Popup>
      <Modal opened={opened} close={() => changeOpened(false)}>
        <ReportModal />
      </Modal>
      <Modal opened={opened_accurate} close={() => changeOpenedA(false)}>
        <DetailsModal
          thing={thing}
          data={data}
          url={url_rq}
          editOpen={() => changeOpenedF(true)}
          close={() => changeOpenedA(false)}
        />
      </Modal>
      <Modal opened={opened_form} close={() => changeOpenedF(false)}>
        {renderForm()}
      </Modal>
      <div className="w-11/12 grid sm:grid-cols-1 h-fit md:grid-cols-2 gap-5 items-center">
        <div
          className="flex justify-center p-2 items-center h-fit bg-amber-700 dark:bg-amber-900 hover:cursor-pointer rounded-md hover:bg-amber-950 border-2 border-amber-950"
          onClick={() => {
            changeForm(5);
            changeOpenedF(true);
            setThing(null);
          }}
        >
          Сделать учёт
        </div>
        <div
          className="flex justify-center p-2 items-center h-fit bg-amber-700 dark:bg-amber-900 hover:cursor-pointer rounded-md hover:bg-amber-950 border-2 border-amber-950"
          onClick={() => {
            changeOpened(true);
          }}
        >
          Просмотреть отчёт
        </div>
      </div>
      <div className="grid h-full overflow-y-scroll grid-flow-row items-center justify-center gap-5">
        {data ? (
          <>
            <div className="h-fit grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 col-start-1 sm:col-end-2 md:col-end-3 lg:col-end-3">
              <Goals
                goals={data["goals"] ? data["goals"] : []}
                setThing={setThing}
                open={() => changeOpenedA(true)}
                changeForm={changeForm}
                changeOpenedF={changeOpenedF}
                resources={data["resources"] ? data["resources"] : []}
              />
            </div>

            <div className="h-fit grid md:grid-cols-1 lg:grid-cols-3 gap-5 col-start-1 sm:col-end-2 md:col-end-3 lg:col-end-3">
              <Resources
                resources={data["resources"] ? data["resources"] : []}
                setThing={setThing}
                open={() => changeOpenedA(true)}
                changeForm={changeForm}
                changeOpenedF={changeOpenedF}
              />
            </div>

            <div className="h-fit grid md:grid-cols-1 lg:grid-cols-3 gap-5 col-start-1 sm:col-end-2 md:col-end-3 lg:col-end-3">
              <Warehouses
                warehouses={data["warehouses"] ? data["warehouses"] : []}
                open={() => changeOpenedA(true)}
                setThing={setThing}
                changeForm={changeForm}
                changeOpenedF={changeOpenedF}
              />
            </div>
            <div className="h-fit grid md:grid-cols-1 lg:grid-cols-3 gap-5 col-start-1 sm:col-end-2 md:col-end-3 lg:col-end-3">
              <Suppliers
                suppliers={data["companies"] ? data["companies"] : []}
                open={() => changeOpenedA(true)}
                setThing={setThing}
                changeForm={changeForm}
                changeOpenedF={changeOpenedF}
              />
              <AnalyticsButton
                open={() => changeOpenedF(true)}
                changeForm={changeForm}
                title={"Добавить поставщика"}
                form_id={2}
                setThing={setThing}
              />
            </div>
            <AnalyticsTable
              resource_links={data["resource_links"]}
              resources={data["resources"]}
              suppliers={data["companies"]}
              warehouses={data["warehouses"]}
              setThing={setThing}
              open={() => changeOpenedA(true)}
              changeForm={changeForm}
              changeOpenedF={changeOpenedF}
            />
          </>
        ) : (
          <>Загрузка...</>
        )}
      </div>
    </div>
  );
}
