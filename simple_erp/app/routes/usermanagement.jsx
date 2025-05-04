import { UserManagement } from "../pages/UserManagement.jsx";

export function meta() {
  return [
    { title: "SERP" },
    { name: "description", content: "UserManagement." },
  ];
}

export default function Dashboard() {
  return <UserManagement />;
}
