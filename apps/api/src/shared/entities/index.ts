import { collection } from "../tables/collection.table"
import { invitation } from "../tables/invitation.table"
import { user as userTable } from "../tables/user.table"

export type User = typeof userTable.$inferSelect
export type Notification = typeof invitation.$inferSelect
export type Collection = typeof collection.$inferSelect