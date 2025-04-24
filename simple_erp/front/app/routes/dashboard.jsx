import { Analytics } from "../pages/Analytics.jsx";

export function meta() {
  return [
    { title: "SERP" },
    { name: "description", content: "Аналитика в SERP. Генерация отчётов." },
  ];
}

export default function Dashboard() {
  return <Analytics />;
}
