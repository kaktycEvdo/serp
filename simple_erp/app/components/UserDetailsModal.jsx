import axios from "axios";

export default function UserDetailsModal({ close, user }) {
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
        <div className="flex text-white justify-center items-center h-full p-2 bg-red-700 hover:cursor-pointer rounded-md hover:bg-red-800 border-2 border-red-800"
        // onClick={() => {
        //     axios.post();
        // }}
        >
          Удалить
        </div>
        <div className="flex text-white justify-center items-center h-full p-2 bg-amber-700 dark:bg-amber-900 hover:cursor-pointer rounded-md hover:bg-amber-950 border-2 border-amber-950">
          Изменить
        </div>
        <div className="flex text-white justify-center items-center h-full p-2 bg-emerald-700 hover:cursor-pointer rounded-md hover:bg-emerald-800 border-2 border-emerald-800">
          {user["role"] ? "Понизить" : "Повысить"}
        </div>
      </div>
      <p className="text-sm text-gray-500 whitespace-normal w-1/2 text-center">
        "Повышение" и "понижение" относится исключительно к повышению до роли
        администратора и понижению до роли работника.
      </p>
    </div>
  );
}
