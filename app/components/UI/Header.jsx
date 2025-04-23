import { NavLink } from "react-router";

export function MyAppNav() {
  return (
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/trending" end>
        Trending Concerts
      </NavLink>
      <NavLink to="/concerts">All Concerts</NavLink>
      <NavLink to="/account">Account</NavLink>
    </nav>
  );
}

export function Header() {
    return (
    <header className="flex flex-row items-center justify-between h-20 p-5 border-b-4 border-b-emerald-400">
        <nav className="h-20 flex flex-row p-5 items-center gap-5">
            <NavLink to="/" className="h-full w-20" end>
                <img src="app/assets/icon.svg" alt="logo" className="h-full w-full" />
            </NavLink>
            <NavLink to="/" className={({ isActive, isPending }) =>
                [
                isPending ? "text-gray-700" : "",
                isActive ? "text-emerald-400" : "",
                ].join(" ")
            } end>
                Главная
            </NavLink>
            <NavLink to="dashboard" className={({ isActive, isPending }) =>
                [
                isPending ? "text-gray-700" : "",
                isActive ? "text-emerald-400" : "",
                ].join(" ")
            } end>
                Панель управления
            </NavLink>
        </nav>
        <div className="h-20 flex flex-row p-5 items-center gap-5">
            <NavLink to="auth" className={({ isActive, isPending }) =>
                [
                isPending ? "text-gray-700" : "",
                isActive ? "text-emerald-400" : "",
                ].join(" ")
            } end>
                Авторизация
            </NavLink>
            <NavLink to="reg" className={({ isActive, isPending }) =>
                [
                isPending ? "text-gray-700" : "",
                isActive ? "text-emerald-400" : "",
                ].join(" ")
            } end>
                Регистрация
            </NavLink>
        </div>
    </header>
  )
}