import { account } from "./account.table";
import { invitation } from "./invitation.table";
import { member } from "./member.table";
import { organization } from "./organization.table";
import { session } from "./session.table";
import { user } from "./user.table";
import { verification } from "./verification.table";

export const schema = {
  user,
  account,
  invitation,
  member,
  verification,
  session,
  organization,
}