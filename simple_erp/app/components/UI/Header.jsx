import { useContext, useState } from "react";
import { NavLink } from "react-router";
import imgUrl from './../../assets/icon.svg';
import { UserContext } from "../../UserContext";

export function Header() {
  let [menuShow, menuShowChange] = useState(false);
  const user = useContext(UserContext);

  return (
    <header className="flex flex-row items-center h-20 p-5 border-b-4 border-b-emerald-400">
      <nav className="h-20 flex p-5 justify-between items-center gap-5 lg:hidden w-full">
        <div>
          <NavLink to="/" end>
            <img src={imgUrl} alt="logo" className="h-15 w-20 dark:invert" />
          </NavLink>
        </div>
        <div>
          <button onClick={() => menuShowChange(!menuShow)}>Меню</button>
        </div>
      </nav>
      <nav
        className={
          menuShow
            ? "flex lg:hidden flex-col bg-white dark:bg-gray-950 right-0 absolute w-60 top-20 gap-5 items-end text-right justify-start p-5 border-l-4 border-l-emerald-600"
            : "hidden"
        }
        style={{ height: "calc(100vh - (var(--spacing) * 20))" }}
      >
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            [
              isPending ? "text-gray-700" : "",
              isActive ? "dark:text-emerald-400 text-emerald-600" : "",
            ].join(" ")
          }
          end
        >
          Главная
        </NavLink>
        <NavLink
          to="dashboard"
          className={({ isActive, isPending }) =>
            [
              isPending ? "text-gray-700" : "",
              isActive ? "dark:text-emerald-400 text-emerald-600" : "",
            ].join(" ")
          }
          end
        >
          Панель управления
        </NavLink>
        <NavLink
          to="usermanagement"
          className={({ isActive, isPending }) =>
            [
              isPending ? "text-gray-700" : "",
              isActive ? "dark:text-emerald-400 text-emerald-600" : "",
            ].join(" ")
          }
          end
        >
          Управление работниками
        </NavLink>
        { user ? null : <><NavLink
          to="auth"
          className={({ isActive, isPending }) =>
            [
              isPending ? "text-gray-700" : "",
              isActive ? "dark:text-emerald-400 text-emerald-600" : "",
            ].join(" ")
          }
          end
        >
          Авторизация
        </NavLink>
        <NavLink
          to="reg"
          className={({ isActive, isPending }) =>
            [
              isPending ? "text-gray-700" : "",
              isActive ? "dark:text-emerald-400 text-emerald-600" : "",
            ].join(" ")
          }
          end
        >
          Регистрация
        </NavLink></> }
        
        <NavLink
            to="docs"
            className={({ isActive, isPending }) =>
              [
                isPending ? "text-gray-700" : "",
                isActive ? "dark:text-emerald-400 text-emerald-600" : "",
              ].join(" ")
            }
            end
          >
            Документация
          </NavLink>
      </nav>
      <nav className="h-20 hidden p-5 justify-between items-center gap-5 lg:flex lg:flex-row w-full">
        <div className="w-full flex flex-row gap-5 justify-start items-center">
          <NavLink to="/" end>
            <img src={imgUrl} alt="logo" className="h-15 w-20 dark:invert" />
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              [
                isPending ? "text-gray-700" : "",
                isActive ? "dark:text-emerald-400 text-emerald-600" : "",
              ].join(" ")
            }
            end
          >
            Главная
          </NavLink>
          <NavLink
            to="dashboard"
            className={({ isActive, isPending }) =>
              [
                isPending ? "text-gray-700" : "",
                isActive ? "dark:text-emerald-400 text-emerald-600" : "",
              ].join(" ")
            }
            end
          >
            Панель управления
          </NavLink>
          <NavLink
            to="usermanagement"
            className={({ isActive, isPending }) =>
              [
                isPending ? "text-gray-700" : "",
                isActive ? "dark:text-emerald-400 text-emerald-600" : "",
              ].join(" ")
            }
            end
          >
            Управление работниками
          </NavLink>
        </div>
        <div className="h-20 flex flex-row p-5 items-center gap-5">
          <NavLink
            to="auth"
            className={({ isActive, isPending }) =>
              [
                isPending ? "text-gray-700" : "",
                isActive ? "dark:text-emerald-400 text-emerald-600" : "",
              ].join(" ")
            }
            end
          >
            Авторизация
          </NavLink>
          <NavLink
            to="reg"
            className={({ isActive, isPending }) =>
              [
                isPending ? "text-gray-700" : "",
                isActive ? "dark:text-emerald-400 text-emerald-600" : "",
              ].join(" ")
            }
            end
          >
            Регистрация
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
