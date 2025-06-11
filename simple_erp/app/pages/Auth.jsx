import { useContext, useState } from "react";
import axios from "axios";
import { Modal } from "../components/UI/Modal";
import { Popup } from "../components/UI/Popup";
import { UserContext } from "../UserContext";
import { host } from "../host";

const url = host+"user.php/";

function validateEmail(email) {
  if (!email.match(/[a-z0-9._-]+@[a-z]{3,}\.[a-z]{2,3}/)) {
    return [1, "Электронная почта пользователя не соответствует стандарту"];
  }

  return [0, "Почта валидна"];
}

export function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("Заполните поля");
  const [status, setStatus] = useState(1);
  const [can_send, setCanSend] = useState(false);
  const [opened_popup, changeOpenedPopup] = useState(false);
  const [popup_content, changePopupContent] = useState(null);
  const user = useContext(UserContext);

  function makePopup(status, text = popup_content){
    changePopupContent(text);
    setStatus(status);
    changeOpenedPopup(true);
  }

  async function exportData(email, password) {
    if(can_send){
      const response = await axios.post(
        url,
        {
          mode: "cors",
          email: email,
          password: password,
          command: "auth",
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }, withCredentials: "include"
        }
      );
      let text = response.data;
      if (text != "not found") {
        makePopup(0, "Успешная авторизация");
        localStorage.setItem("user", text);
      }
      else{
        makePopup(1, "Ошибка авторизации: неверные данные");
        localStorage.removeItem("user");
      }
    }
    else{
      makePopup(1, error);
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
  function checkFields(p_email = null, p_password = null) {
    setCanSend(false);
    if(!p_email) p_email = email;
    if(!p_password) p_password = password;

    if (p_password.trim() != "" && p_email.trim() != "") {
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

  return (
    <>
      <Popup opened={opened_popup} close={() => changeOpenedPopup(false)} status={status}>
        <div className="flex break-words whitespace-pre w-full overflow-auto">
          {popup_content}
        </div>
      </Popup>
      <div className="flex justify-center flex-col items-center">
        <div className="flex p-5 justify-center flex-col items-center gap-5 dark:bg-gray-800 bg-gray-300 border-2 dark:border-white w-2xs">
          <h1>Авторизация</h1>
          <p className="text-sm text-gray-500">
            Все обязательные поля отмечены астериском (*)
          </p>
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={(e) => {
              changeEmail(e.target.value);
            }}
            className="bg-white rounded-md text-black p-1 border-2 border-black dark:border-0"
          />
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            value={password}
            name="password"
            max={48}
            onChange={(e) => {
              changePassword(e.target.value);
            }}
            className="bg-white rounded-md text-black p-1 border-2 border-black dark:border-0"
          />
          <input
            type="button"
            value="Отправить данные"
            className={"border-2 p-2 rounded-md text-white dark:text-black "+(can_send ? "dark:bg-emerald-700 bg-emerald-800 hover:bg-emerald-900 border-emerald-950 hover:cursor-pointer" : "dark:bg-gray-700 bg-gray-800 border-gray-950")}
            onClick={async () => {
              exportData(email, password);
            }}
          />
          <div
            id="error-box"
            className="error-box text-red-600 max-w-1/2 text-center"
          >
            {error}
          </div>
        </div>
      </div>
    </>
  );
}
