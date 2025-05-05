import { useState } from "react";
import axios from "axios";

const url = "serp.infinityfreeapp.com/user.php";

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
  ).then((res) => {
    let text = res.data;
    if (validateEmail(text)[0] == 0) {
      localStorage.setItem("user", text);
      setStatus("success");
      setOpened(true);
    }
    console.log(text);
  });
}

function validateEmail(email) {
  if (!email.match(/[a-z0-9._-]+@[a-z]{3,}\.[a-z]{2,3}/)) {
    return [1, "Электронная почта пользователя не соответствует стандарту"];
  }

  return [0, "Почта валидна"];
}

export function Reg() {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [create_new_org, setCNO] = useState(" ");
  const [org_name, setOrgName] = useState(" ");
  const [can_send, setCanSend] = useState(false);

  function changeEmail(email) {
    if (email.trim() != "") {
      let validationRes = validateEmail(email);
      if (validationRes[0] === 1) {
        document.getElementById("error-box").innerHTML = validationRes[1];
        setCanSend(false);
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
        setCanSend(false);
      } else {
        setPassword(password);
        document.getElementById("error-box").innerHTML = "";
      }
    }
  }
  function changeOrgName(org) {
    if (org.trim() != "") {
      if (org.length == 0) {
        document.getElementById("error-box").innerHTML =
          "Пустое наименование организации";
        setCanSend(false);
      } else {
        setOrgName(org);
        document.getElementById("error-box").innerHTML = "";
      }
    }
  }
  function checkFields() {
    if (
      email &&
      password &&
      create_new_org &&
      org_name &&
      document.getElementById("error-box").innerHTML == ""
    ) {
      setCanSend(true);
    }
  }

  return (
    <div className="grid lg:grid-cols-2 sm:grid-cols-1 justify-center items-center gap-5 p-5">
      <h1 className="break-words lg:col-start-1 lg:col-end-3 text-center">
        Регистрация
      </h1>
      <div className="grid h-96 overflow-y-scroll overflow-x-hidden p-5 justify-center flex-col items-center lg:w-96 gap-5 bg-gray-800 border-2 dark:border-white w-2xs">
        <div className="flex p-5 justify-center flex-col items-center gap-5">
          <div className="flex max-h-full p-5 justify-center flex-col items-center gap-5">
            <div className="flex justify-center flex-col items-center gap-5">
              <p className="text-center">
                Вы представитель уже существующей в системе организации или
                новой?
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
                <label htmlFor="org_name">Наименование организации:</label>
                <input
                  type="text"
                  defaultValue={""}
                  id="org_name"
                  className="bg-white border-2 w-full border-black rounded-md p-2 text-black"
                  onChange={(e) => {
                    setOrgName(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-full overflow-y-scroll overflow-x-hidden p-5 justify-center flex-col items-center lg:w-96 gap-5 bg-gray-800 border-2 dark:border-white w-2xs">
        <div className="flex p-5 justify-center flex-col items-center gap-5">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            onChange={(e) => {
              changeEmail(e.target.value);
            }}
            className="bg-white rounded-md text-black p-1 border-2 border-black dark:border-0"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            onChange={(e) => {
              changePassword(e.target.value);
            }}
            className="bg-white rounded-md text-black p-1 border-2 border-black dark:border-0"
          />
          <div
            id="error-box"
            className="error-box text-red-600 max-w-1/2 text-center"
          >
            Заполните поля.
          </div>
        </div>
      </div>

      <div className="lg:col-start-1 lg:col-end-3 justify-center items-center flex">
        <input
          type="button"
          className="bg-emerald-600 p-2 rounded-md hover:cursor-pointer"
          value="Отправить данные"
          onClick={() => {
            checkFields();
            if (can_send) exportData(email, password, create_new_org, org_name);
          }}
        />
      </div>
    </div>
  );
}
