import Elysia, { status, t } from "elysia";
import { ElysiaWS } from "elysia/dist/ws";
import { auth } from "../../config/auth";
import { UserService } from "../user/service";
import { NotificationService } from "./services";
import { User } from "../../shared/entities";


const connectedUsers = new Map<string, ElysiaWS>();

export const notificationsController = new Elysia({ name: "notifications" })
  .decorate("user", null as unknown as User)
  .ws("/ws", {
    open: (ws) => {
      console.log('Cliente WebSocket conectado!');
    },

    message: (ws, message) => {
      console.log(`📬 Mensagem recebida no WS: ${JSON.stringify(message)}`);
      const parsed = message as { type: string, userId?: string };


      if (parsed.type === 'IDENTIFY' && parsed.userId) {
        const userId = parsed.userId;
        connectedUsers.set(userId, ws);

        console.log(`✅ Usuário ${userId} identificado no WS`);
      }
    },

    close: (ws) => {
      for (const [userId, socket] of connectedUsers.entries()) {
        if (socket === ws) {
          connectedUsers.delete(userId);
          console.log(`❌ Usuário ${userId} desconectado do WS`);
        }
      }
    }
  })
  .post('/notify', async ({ body }) => {
    const { email, organizationName } = body;

    const user = await UserService.getByEmail(email)

    if (user.length === 0 ) {
      return status(404, { message: "User not found" })
    }

    const toUserId = user[0].id

    const targetSocket = connectedUsers.get(toUserId);

    if (targetSocket) {
      targetSocket.send(
        JSON.stringify({
          type: 'INVITATION',
          message: `Você foi convidado para entrar na organização: ${organizationName}`,
        })
      );
      console.log(`📨 Notificação enviada para ${toUserId}`);
    } else {
      console.log(`⚠️ Usuário ${toUserId} não está conectado no WS`);
    }

    return {
      message: 'Notificação enviada com sucesso'
    }
  }, {
    body: t.Object({
      email: t.String(),
      organizationName: t.String(),
    }),
    //auth: true,
  })
  .get('/notifications', async ({ user }) => {
      const notifications = await NotificationService.getMyNotifications(user.email);
      return notifications;
    }, {
      auth: true
    })