import { drizzle as drizzleOrm } from 'drizzle-orm/node-postgres';
export const drizzle = drizzleOrm(process.env.DATABASE_URL!);