import { Index } from "../pages/Index.jsx";

export function meta() {
  return [
    { title: "SERP" },
    { name: "description", content: "Добро пожаловать в SERP." },
  ];
}

export default function Home() {
  return <Index />;
}
