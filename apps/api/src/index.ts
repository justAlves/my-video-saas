import { Elysia } from "elysia";
import { authController } from "./modules/auth";
import { cors } from "@elysiajs/cors";
import { userController } from "./modules/user";
import { uploadController } from "./modules/upload";
import { notificationsController } from "./modules/notifications";
import { swagger } from "@elysiajs/swagger"
import { collectionsController } from "./modules/collections";

const app = 
  new Elysia()
  .use(cors({
      origin: ["http://localhost:5173", "https://nixy-chi.vercel.app"], // Your frontend URL
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
  }))
  .use(swagger({
    documentation: {
      info: {
        title: "Vixy API Documentation",
        version: "1.0.0",
        description: "This is the API documentation for the Vixy backend services."
      },
      
    }
  }))
  .use(authController)
  .use(userController)
  .use(uploadController)
  .use(notificationsController)
  .use(collectionsController)
  .get("/health", () => "Healthy")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
