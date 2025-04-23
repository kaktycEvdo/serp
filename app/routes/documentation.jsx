import { Documentation } from "../pages/Documentation.jsx";

export function meta() {
  return [
    { title: "SERP" },
    { name: "description", content: "Добро пожаловать в SERP." },
  ];
}

export default function Document() {
  return <Documentation />;
}
