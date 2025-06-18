import { useEffect, useState } from "react";
import { Modal } from "../components/UI/Modal.jsx";
import { Popup } from "../components/UI/Popup.jsx";
import axios from "axios";
import Item from "../components/UI/Item.jsx";
import UserDetailsModal from "../components/UserDetailsModal.jsx";
import { host } from "../host.js";
import UserForm from "../components/UserForm.jsx";

const url_get = host+"get.php?command=getAll&item=users";
const url_acc = host+"org.php?command=role&id=";
const url_user = host+"user.php";

export function UserManagement() {
  const [data, setData] = useState(null);
  const [opened_details, changeOpenedDetails] = useState(false);
  const [opened_form, changeOpenedForm] = useState(false);
  const [opened_popup, changeOpenedPopup] = useState(false);
  const [status, setStatus] = useState(1);
  const [popup_content, changePopupContent] = useState(null);
  const [user, changeUser] = useState(null);

  // let [opened_user_form, changeOpenedUF] = useState(false);

  function makePopup(status, text = popup_content){
    changePopupContent(text);
    setStatus(status);
    changeOpenedPopup(true);
  }

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = localStorage.getItem('user');
      axios
        .get(
          url_acc + user
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
        }).catch((error) => {
          if(error.message == 403){
            redirect("auth");
          }
          changePopupContent(
            "Ошибка при подключении к серверу. Вывод: " + error.message
          );
          changeOpenedPopup(true);
        });
      // live reaction to changing data requires intervals of checking. 2 - seconds, 1000 - milliseconds.
      let interval = 2 * 1000;
      axios
        .get(url_get + "&user_id=" + user, {
          mode: "cors",
        })
        .then((res) => {
          let result = res;
          setData(result.data);
        })
        .then(
          setInterval(() => {
            axios
              .get(url_get + "&user_id=" + user, {
                mode: "cors",
              })
              .then((res) => {
                setData(res.data);
              });
          }, interval)
        );
    }
  }, []);

  return (
    <div className="flex w-screen h-full justify-center flex-col items-center">
      <Popup opened={opened_popup} close={() => changeOpenedPopup(false)} status={status}>
        <div className="flex break-words whitespace-pre w-full overflow-auto">
          {popup_content}
        </div>
      </Popup>
      <Modal opened={opened_details} close={() => changeOpenedDetails(false)}>
        <div className="flex break-words whitespace-pre w-full overflow-auto">
          <UserDetailsModal user={user} url={url_user} makePopup={makePopup} openForm={() => {changeOpenedForm(true); changeOpenedDetails(false)}} />
        </div>
      </Modal>
      <Modal opened={opened_form} close={() => changeOpenedForm(false)}>
        <div className="flex break-words whitespace-pre w-full overflow-auto">
          <UserForm user={user} url={url_user} makePopup={makePopup} close={() => changeOpenedForm(false)} />
        </div>
      </Modal>
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
                    <Item
                      key={"n" + index}
                      onClick={() => {
                        changeOpenedDetails(true);
                        changeUser(user);
                      }}
                    >
                      <div>Почта: {user["email"]}</div>
                    </Item>
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
                    <Item
                      key={"n" + index}
                      onClick={() => {
                        changeOpenedDetails(true);
                        changeUser(user);
                      }}
                    >
                      <div>Почта: {user["email"]}</div>
                    </Item>
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
