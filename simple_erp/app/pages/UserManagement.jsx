import { useEffect, useState } from "react";
import { Modal } from "../components/UI/Modal.jsx";
import { Popup } from "../components/UI/Popup.jsx";
import axios from "axios";
import { redirect } from "react-router";

const url_get = "https://xn--e1aucc.site/get.php?command=getAll&item=users";
// const url_user = "http://serp.infinityfreeapp.com/user.php/";

export function UserManagement() {
  let [data, setData] = useState(null);
  let [opened_popup, changeOpenedPopup] = useState(false);
  let [popup_content, changePopupContent] = useState(null);

  // let [opened_user_form, changeOpenedUF] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('user')){
    axios
      .get(
        "https://xn--e1aucc.site/org.php?command=acception&id=" +
          localStorage.getItem("user")
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
        url_get + "&user_id=" +
          localStorage.getItem("user"),
        { mode: "cors" }
      )
      .then((res) => {
        let result = res;
        if (result.headers.getContentType().split("; ")[0] === "text/html") {
          changePopupContent(
            "Ошибка на стороне сервера. Вывод: " + result.data
          );
          changeOpenedPopup(true);
        }
        setData(result.data);
      })
      .then(
        setInterval(() => {
          axios
            .get(
              url_get + "&user_id=" +
                localStorage.getItem("user"),
              { mode: "cors" }
            )
            .then((res) => {
              setData(res.data);
            });
        }, interval)
      );
    }
      else{
        redirect('auth');
      }
  }, []);

  return (
    <div className="flex w-screen h-full justify-center flex-col items-center">
      <Popup opened={opened_popup} close={() => changeOpenedPopup(false)}>
        <div className="flex break-words whitespace-pre w-full overflow-auto">
          {popup_content}
        </div>
      </Popup>
      <div className="flex max-h-full overflow-y-scroll w-full justify-center items-start">
        <div className="p-5 w-full grid grid-flow-row gap-5">
          <div className="h-fit grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <h2 className="col-start-1 sm:col-end-2 md:col-end-3 lg:col-end-5">
              Не принятые пользователи
            </h2>
            {data ? (
              data["not_accepted"].length > 0 ? (
                data["not_accepted"].map((user, index) => {
                  return (
                    <div
                      key={"n" + index}
                      className="grid h-full p-5 justify-center items-center text-center bg-emerald-600 dark:bg-emerald-950 hover:cursor-pointer rounded-md"
                    >
                      <div>Почта: {user["email"]}</div>
                    </div>
                  );
                })
              ) : (
                <>Нет пользователей</>
              )
            ) : (
              <>Загрузка...</>
            )}
          </div>
          <div className="h-fit grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <h2 className="col-start-1 sm:col-end-2 md:col-end-3 lg:col-end-5">
              Принятые пользователи
            </h2>
            {data ? (
              data["accepted"].length > 0 ? (
                data["accepted"].map((user, index) => {
                  return (
                    <div
                      key={"n" + index}
                      className="grid h-full p-5 justify-center items-center text-center bg-emerald-600 dark:bg-emerald-950 hover:cursor-pointer rounded-md"
                    >
                      <div>Почта: {user["email"]}</div>
                    </div>
                  );
                })
              ) : (
                <>Нет пользователей</>
              )
            ) : (
              <>Загрузка...</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
