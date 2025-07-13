import { Elysia } from "elysia";
import { authController } from "./modules/auth";
import cors from "@elysiajs/cors";
import { userController } from "./modules/user";
import { uploadController } from "./modules/upload";
import { notificationsController } from "./modules/notifications";

const app = 
  new Elysia()
  .use(cors({
      origin: "http://localhost:5173", // Your frontend URL
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
  }))
  .use(authController)
  .use(userController)
  .use(uploadController)
  .use(notificationsController)
  .get("/health", () => "Healthy")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
