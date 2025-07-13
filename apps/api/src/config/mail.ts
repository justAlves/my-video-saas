import { Resend } from "resend";

const mail = new Resend(process.env.RESEND_API_KEY);

mail.apiKeys.create({ name: 'Production' });



export {
  mail
}