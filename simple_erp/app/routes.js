import { index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.jsx"),
    route("documentation", "routes/documentation.jsx"),
    route("dashboard", "routes/dashboard.jsx"),
    route("usermanagement", "routes/usermanagement.jsx"),
    
    route("auth", "routes/auth.jsx"),
    route("reg", "routes/reg.jsx")
];
