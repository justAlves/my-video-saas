import { drizzle } from "../../config/db";
import { Notification } from "../../shared/entities";
import { invitation } from "../../shared/tables/invitation.table";
import { eq } from "drizzle-orm";
import { user } from "../../shared/tables/user.table";
import { organization } from "../../shared/tables/organization.table";

export abstract class NotificationService {
  static async getMyNotifications(email: string) {
    const notifications = await drizzle.select().from(invitation).where(
      eq(invitation.email, email)
    ).innerJoin(
      user, eq(invitation.inviterId, user.id)
    ).innerJoin(
      organization, eq(invitation.organizationId, organization.id)
    )

    const notificationsWithUser = notifications.map(({ invitation, user, organization }) => ({
      ...invitation,
      inviter: user,
      organization: organization
    }))
    
    return notificationsWithUser;
  }
}