import { betterAuth } from "better-auth";
import { admin, organization } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "./db"; // your drizzle instance
import { schema } from "../shared/tables/schema";
import { mail } from "./mail";
import InvitationTemplate from "../shared/templates/invitation";
import { status } from "elysia";
 
export const auth = betterAuth({
  database: drizzleAdapter(drizzle, {
    provider: "pg",
    schema: schema
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    }
  },
  plugins: [
    admin(),
    organization({
      sendInvitationEmail: async ({ id, email, inviter, organization }) => {
        try {
          const inviteLink = `http://localhost:5173/invite/${id}`;

          const html = InvitationTemplate(organization.name, organization.id, inviter.user.name, inviteLink);

          const result = await mail.emails.send({
            from: "Boilerplate Team <no-reply@useblackhole.com.br>",
            to: [email],
            subject: `Você foi convidado para a organização ${organization.name}`,
            html
          })

          console.log(result)
        } catch (error) {
          status(500, { message: "Failed to send invitation email" })
          console.error(error)
        }
      }
    }),
  ], 
  trustedOrigins: [
    "http://localhost:5173", // Your frontend URL
    "https://your-production-domain.com" // Your production URL
  ],

});