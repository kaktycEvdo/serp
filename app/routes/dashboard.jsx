import { Analytics } from "../pages/Analytics.jsx";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

export function meta() {
  return [
    { title: "SERP" },
    { name: "description", content: "Аналитика в SERP. Генерация отчётов." },
  ];
}

export default function Dashboard() {
  return <Analytics />;
}
