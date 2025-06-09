import { useState } from "react";
import axios from "axios";
import { Popup } from "../components/UI/Popup";
import { Modal } from "../components/UI/Modal";
import { host } from "../host";

const url = host+"user.php/";

function validateEmail(email) {
  if (!email.match(/[a-z0-9._-]+@[a-z]{3,}\.[a-z]{2,3}/)) {
    return [1, "Электронная почта пользователя не соответствует стандарту"];
  }

  return [0, "Почта валидна"];
}

export function Reg() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [create_new_org, setCNO] = useState("");
  const [org_name, setOrgName] = useState("");
  const [can_send, setCanSend] = useState(false);
  const [error, setError] = useState("Заполните поля");
  let [opened_popup, changeOpenedPopup] = useState(false);
  let [popup_content, changePopupContent] = useState(false);
  const [opened, setOpened] = useState(false);
  const [status, setStatus] = useState(null);

  function makePopup(status, text = popup_content){
    changePopupContent(text);
    setStatus(status);
    changeOpenedPopup(true);
  }

  async function exportData(email, password, create_new_org, org_name) {
    const response = await axios.post(
      url,
      {
        mode: "cors",
        email: email,
        password: password,
        create_new_org: create_new_org,
        org_name: org_name,
        command: "reg",
      },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    let text = response.data;
    if (typeof text == "number") {
      makePopup(0, "Успешная регистрация");
      localStorage.setItem("user", text);
    }
    else{
      makePopup(0, "Ошибка регистрации. Вывод: "+text);
    }
  }

  function changeEmail(email) {
    setEmail(email);
    checkFields(email, null);
  }
  function changePassword(password) {
    setPassword(password);
    checkFields(null, password);
  }
  function checkFields(p_email = null, p_password = null, p_createorg = null, p_orgname = null) {
    if(!p_email) p_email = email;
    if(!p_password) p_password = password;
    if(!p_createorg) p_createorg = create_new_org;
    if(!p_orgname) p_orgname = org_name;
    setCanSend(false);

    if (p_password.trim() != "" && p_email.trim() != "" && p_orgname.trim() != "") {
      let validationRes = validateEmail(p_email);
      if (validationRes[0] === 1) {
        setError(validationRes[1]);
      }
      else if (p_password.length < 6) {
        setError("Пароль меньше 6 символов");
      }
      else{
        setError(null);
        setCanSend(true);
      }
    }
    else{
      setError("Заполните поля");
    }
  }
  function changeOrgName(org_name) {
    setOrgName(org_name);
    checkFields(null, null, null, org_name);
  }

  return (
    <div className="grid lg:grid-cols-2 sm:grid-cols-1 justify-center items-center gap-5 p-5">
      <Popup opened={opened_popup} close={() => changeOpenedPopup(false)} status={status}>
        <div className="flex break-words whitespace-pre w-full overflow-auto">
          {popup_content}
        </div>
      </Popup>
      <h1 className="break-words lg:col-start-1 lg:col-end-3 text-center">
        Регистрация
        <p className="text-sm text-gray-500">
            Все обязательные поля отмечены астериском (*)
          </p>
      </h1>
      <div className="grid h-96 overflow-y-scroll overflow-x-hidden p-5 justify-center flex-col items-center lg:w-96 gap-5 dark:bg-gray-800 bg-gray-300 border-2 dark:border-white w-2xs">
        <div className="flex p-5 justify-center flex-col items-center gap-5">
          <div className="flex max-h-full p-5 justify-center flex-col items-center gap-5">
            <div className="flex justify-center flex-col items-center gap-5">
              <p className="text-center">
                Вы представитель уже существующей в системе организации или
                новой?*
              </p>
              <div className="flex gap-5 w-full justify-between">
                <label htmlFor="create_org_no" className="text-left">
                  Существующей
                </label>
                <input
                  type="radio"
                  defaultChecked={true}
                  name="create_org"
                  id="create_org_no"
                  value={0}
                  onChange={(e) => {
                    setCNO(e.target.value);
                  }}
                />
              </div>
              <div className="flex gap-5 w-full justify-between">
                <label htmlFor="create_org_yes">Новой</label>
                <input
                  type="radio"
                  name="create_org"
                  id="create_org_yes"
                  value={1}
                  onChange={(e) => {
                    setCNO(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="org_name">Наименование организации*</label>
                <input
                  type="text"
                  value={org_name}
                  id="org_name"
                  className="bg-white border-2 w-full border-black rounded-md p-2 text-black"
                  onChange={(e) => {
                    changeOrgName(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-full overflow-y-scroll overflow-x-hidden p-5 justify-center flex-col items-center lg:w-96 gap-5 dark:bg-gray-800 bg-gray-300 border-2 dark:border-white w-2xs">
        <div className="flex p-5 justify-center flex-col items-center gap-5">
          <label htmlFor="email">Электронная почта*</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              changeEmail(e.target.value);
            }}
            className="bg-white rounded-md text-black p-1 border-2 border-black dark:border-0"
          />
          <label htmlFor="password">Пароль*</label>
          <input
            type="password"
            name="password"
            max={48}
            value={password}
            onChange={(e) => {
              changePassword(e.target.value);
            }}
            className="bg-white rounded-md text-black p-1 border-2 border-black dark:border-0"
          />
          <div
            id="error-box"
            className="error-box text-red-600 max-w-1/2 text-center"
          >
            {error}
          </div>
        </div>
      </div>

      <div className="lg:col-start-1 lg:col-end-3 justify-center items-center flex">
        <input
            type="button"
            value="Отправить данные"
            className={"border-2 p-2 rounded-md text-white dark:text-black "+(can_send ? "dark:bg-emerald-700 bg-emerald-800 hover:bg-emerald-900 border-emerald-950 hover:cursor-pointer" : "dark:bg-gray-700 bg-gray-800 border-gray-950")}
            onClick={async () => {
              exportData(email, password, create_new_org, org_name);
            }}
          />
      </div>
    </div>
  );
}
