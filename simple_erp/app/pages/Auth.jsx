import { useState } from "react";
import axios from "axios";
import { Modal } from "../components/UI/Modal";
import { Popup } from "../components/UI/Popup";

const url = "https://serp.infinityfreeapp.com/user.php/";

function validateEmail(email) {
  if (!email.match(/[a-z0-9._-]+@[a-z]{3,}\.[a-z]{2,3}/)) {
    return [1, "Электронная почта пользователя не соответствует стандарту"];
  }

  return [0, "Почта валидна"];
}

export function Auth() {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [opened, setOpened] = useState(false);
  const [status, setStatus] = useState("error");
  const [can_send, setCanSend] = useState(false);
  let [opened_popup, changeOpenedPopup] = useState(false);
  let [popup_content, changePopupContent] = useState(null);

  async function exportData(email, password) {
    const response = await axios.post(
      url,
      {
        mode: "cors",
        email: email,
        password: password,
        command: "auth",
      },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    )
    .catch((error) => {
      changePopupContent(
        "Ошибка при подключении к серверу. Вывод: " + error.message
      );
      changeOpenedPopup(true);
    })
    .then((res) => {
      let text = res.data;
      if (text) {
        setOpened(true);
        setStatus("success");
        localStorage.setItem("user", text);
      }
      console.log(text);
    });
  }

  function changeEmail(email) {
    if (email.trim() != "") {
      let validationRes = validateEmail(email);
      if (validationRes[0] === 1) {
        document.getElementById("error-box").innerHTML = validationRes[1];
      } else {
        setEmail(email);
        document.getElementById("error-box").innerHTML = "";
      }
    }
  }
  function changePassword(password) {
    if (password.trim() != "") {
      if (password.length < 6) {
        document.getElementById("error-box").innerHTML =
          "Пароль меньше 6 символов";
      } else {
        setPassword(password);
        document.getElementById("error-box").innerHTML = "";
      }
    }
  }
  function checkFields() {
    if (
      email &&
      password &&
      document.getElementById("error-box").innerHTML == ""
    ) {
      setCanSend(true);
    }
  }

  return (
    <>
      <Modal opened={opened} close={() => setOpened(false)}>
        {status == "error" ? (
          <>
            <h2>Ошибка авторизации</h2>
          </>
        ) : (
          <>
            <h2>Успешная авторизация</h2>
          </>
        )}
      </Modal>
      <Popup opened={opened_popup} close={() => changeOpenedPopup(false)}>
        <div className="flex break-words whitespace-pre w-full overflow-auto">
          {popup_content}
        </div>
      </Popup>
      <div className="flex justify-center flex-col items-center">
        <div className="flex p-5 justify-center flex-col items-center gap-5 dark:bg-gray-800 bg-gray-300 border-2 dark:border-white w-2xs">
          <h1>Авторизация</h1>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            defaultValue={""}
            name="email"
            onChange={(e) => {
              changeEmail(e.target.value);
            }}
            className="bg-white rounded-md text-black p-1 border-2 border-black dark:border-0"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            defaultValue={""}
            name="password"
            onChange={(e) => {
              changePassword(e.target.value);
            }}
            className="bg-white rounded-md text-black p-1 border-2 border-black dark:border-0"
          />
          <input
            type="button"
            value="Отправить данные"
            className="dark:bg-emerald-600 bg-emerald-900 p-2 rounded-md hover:cursor-pointer text-white dark:text-black"
            onClick={async () => {
              checkFields();
              if (can_send) await exportData(email, password);
            }}
          />
          <div
            id="error-box"
            className="error-box text-red-600 max-w-1/2 text-center"
          >
            Заполните поля.
          </div>
        </div>
      </div>
    </>
  );
}
