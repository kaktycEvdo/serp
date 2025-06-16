import axios from "axios";

export default function UserForm({ url, close, user, makePopup }) {
    return (
      <div className="mt-3 text-center w-full grid justify-center sm:mt-0 sm:ml-4 sm:text-center">
        <h3 className="modal-title text-base font-semibold text-gray-900">
          Изменение пользователя
        </h3>
        <form
          className="grid grid-cols-2 gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            let fields = document.querySelectorAll("input.usr");
            let body = {
              mode: "cors",
              id: user['id'],
              command: "edit",
              email: fields[0].value != "" ? fields[0].value : user['email'],
              password: fields[1].value,
              user_id: localStorage.getItem("user"),
            }
            let options = {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            };
            axios.post(url, body, options).then((res) => {
                makePopup(res.data != 200, res.data != 200 ? "Ошибка: "+res.data : "Успешные изменения пользователя!");
                close();
            });
          }}
        >
          <label htmlFor="usr_email">Наименование</label>
          <input
            type="text"
            className="usr bg-white text-black border-2 border-black"
            name="email"
            id="usr_email"
            defaultValue={user['email']}
          />
          <label htmlFor="usr_pswrd">Пароль</label>
          <input
            type="password"
            className="usr bg-white text-black border-2 border-black"
            name="password"
            id="usr_pswrd"
            defaultValue={""}
          />
          <div className="px-4 py-3 sm:flex sm:flex-row justify-center sm:px-6 col-start-1 col-end-3">
            <input
              type="submit"
              className="inline-flex w-full justify-center rounded-md cursor-pointer bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-800 sm:w-auto"
              value={"Изменить"}
            />
          </div>
        </form>
      </div>
    );
  }
  