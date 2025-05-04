import { Documentation } from "../pages/Documentation.jsx";

export function meta() {
  return [
    { title: "Документация" },
    { name: "description", content: "Добро пожаловать в SERP." },
  ];
}

export default function Document() {
  return <Documentation />;
}
