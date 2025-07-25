import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { user } from "./user.table";
import { organization } from "./organization.table";

export const collection = pgTable("collection", {
  id: text('id').primaryKey().$defaultFn(createId),
  name: varchar({ length: 255 }).notNull(),
  description: text('description'),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  organizationId: text('organization_id').references(() => organization.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})