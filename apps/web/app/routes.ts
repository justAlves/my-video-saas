import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/app-layout.tsx", [
    index("routes/dashboard.tsx"),
    route("/collection/:id", "routes/collection.tsx"),
  ]),
  route("/login", "routes/auth/login.tsx"),
  route("/register", "routes/auth/register.tsx"),
] satisfies RouteConfig;
