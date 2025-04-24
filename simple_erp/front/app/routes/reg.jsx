import { Reg } from "../pages/Reg.jsx";

export function meta() {
  return [
    { title: "Регистрация" },
    { name: "description", content: "Зарегистрируйтесь в SERP для получения возможности попробовать создать свою ERP-систему." },
  ];
}

export default function Register() {
  return <Reg />;
}
