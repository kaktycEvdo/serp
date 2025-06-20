import axios from "axios";

export default function UserDetailsModal({ close, user, url, makePopup, openForm }) {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="flex flex-col w-full justify-center items-center">
        <h3 className="modal-title text-base font-semibold text-gray-900 text-center">
          Работа с пользователем
        </h3>
        {user ? (
          <>
            <div>Пользователь: {user["email"]}</div>
            <div>Статус: {user["accepted"] ? "Принят" : "Не принят"}</div>
            <div>Роль: {user["accepted"] ? "Администратор" : "Работник"}</div>
          </>
        ) : (
          <>Информации нет</>
        )}
      </div>
      <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
        {
          user['accepted']
          ? <>
          <div className="flex text-white justify-center items-center h-full p-2 bg-red-700 hover:cursor-pointer rounded-md hover:bg-red-800 border-2 border-red-800"
            onClick={() => {
              axios.post(url, {
                mode: "cors",
                'command': "delete",
                'id': user['id'],
                'user_id': localStorage.getItem('user')
              },{
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
              }).then((res) => {
                close();
                if(res.data == ''){
                  makePopup(0, "Успешное удаление пользователя.");
                  if(user['id'] == localStorage.getItem('user')){localStorage.removeItem('user')};
                }
                else{
                  makePopup(1, "Ошибка удаления пользователя. Вывод: "+res.data);
                }
              });
            }}
            >
              Удалить
            </div>
            <div className="flex text-white justify-center items-center h-full p-2 bg-amber-700 dark:bg-amber-900 hover:cursor-pointer rounded-md hover:bg-amber-950 border-2 border-amber-950"
            onClick={() => openForm()}>
              Изменить
            </div>
            <div className="flex text-white justify-center items-center h-full p-2 bg-emerald-700 hover:cursor-pointer rounded-md hover:bg-emerald-800 border-2 border-emerald-800"
            onClick={() => {
              if(user['role']){
                axios.post(url, {
                  mode: "cors",
                  'command': "role_down",
                  'id': user['id'],
                  'user_id': localStorage.getItem('user')
                },{
                  headers: { "Content-Type": "application/x-www-form-urlencoded" },
                }).then((res) => {
                  close();
                  if(res.data == ''){
                    makePopup(0, "Успешное понижение пользователя.");
                  }
                  else{
                    makePopup(1, "Ошибка повышения пользователя. Вывод: "+res.data);
                  }
                });
              }
              else{
                axios.post(url, {
                  mode: "cors",
                  'command': "role_up",
                  'id': user['id'],
                  'user_id': localStorage.getItem('user')
                },{
                  headers: { "Content-Type": "application/x-www-form-urlencoded" },
                }).then((res) => {
                  close();
                  if(res.data == ''){
                    makePopup(0, "Успешное повышение пользователя.");
                  }
                  else{
                    makePopup(1, "Ошибка повышения пользователя. Вывод: "+res.data);
                  }
                });
              }
            }}>
              {user["role"] ? "Понизить" : "Повысить"}
            </div>
          </>
          : <>
          <div className="flex text-white justify-center items-center h-full p-2 bg-red-700 hover:cursor-pointer rounded-md hover:bg-red-800 border-2 border-red-800"
            onClick={() => {
              axios.post(url, {
                mode: "cors",
                'command': "delete",
                'id': user['id'],
                'user_id': localStorage.getItem('user')
              },{
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
              }).then((res) => {
                close();
                if(res.data == ''){
                  makePopup(0, "Успешное удаление пользователя.");
                }
                else{
                  makePopup(1, "Ошибка удаления пользователя. Вывод: "+res.data);
                }
              });
            }}
            >
              Не принять
            </div>
            <div className="flex text-white justify-center items-center h-full p-2 bg-emerald-700 hover:cursor-pointer rounded-md hover:bg-emerald-800 border-2 border-emerald-800"
            onClick={() => {
              axios.post(url, {
                mode: "cors",
                'command': "accept",
                'id': user['id'],
                'user_id': localStorage.getItem('user')
              },{
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
              }).then((res) => {
                close();
                if(res.data == ''){
                  makePopup(0, "Успешное принятие пользователя.");
                }
                else{
                  makePopup(1, "Ошибка принятия пользователя. Вывод: "+res.data);
                }
              });
            }}>
              Принять
            </div>
          </>
        }
      </div>
      <p className="text-sm text-gray-500 whitespace-normal w-1/2 text-center">
        "Повышение" и "понижение" относится исключительно к повышению до роли
        администратора и понижению до роли работника.
      </p>
    </div>
  );
}
