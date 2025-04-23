import { Auth } from "../pages/Auth.jsx";

export function meta() {
  return [
    { title: "Авторизация" },
    { name: "description", content: "Авторизируйтесь в SERP для получения возможности попробовать создать свою ERP-систему." },
  ];
}

export default function Authorise({setUser}) {
  return <Auth />;
}
