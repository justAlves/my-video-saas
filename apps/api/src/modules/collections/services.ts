import { and, eq, isNull } from "drizzle-orm";
import { drizzle } from "../../config/db";
import { Collection } from "../../shared/entities";
import { collection } from "../../shared/tables/collection.table";

export abstract class CollectionsService {
  static async getByUserId(userId: string): Promise<Collection[]> {
    const collections = await drizzle.select().from(collection).where(and(
      eq(collection.userId, userId),
      isNull(collection.organizationId)
    ))

    return collections;
  }

  static async getByOrganizationId(organizationId: string): Promise<Collection[]> {
    const collections = await drizzle.select().from(collection).where(
      eq(collection.organizationId, organizationId)
    );

    return collections
  }

  static async getById(id: string): Promise<Collection | null> {
    const foundedCollection = await drizzle.select().from(collection).where(eq(collection.id, id)).limit(1);
    return foundedCollection.length ? foundedCollection[0] : null;
}

  static async create(data: any): Promise<Collection> {
    const createdCollection =  await drizzle.insert(collection).values(data).returning()

    return createdCollection[0];
  }

  static async update(data: any, id: string): Promise<void> {
    await drizzle.update(collection).set(data).where(eq(collection.id, id));
  }

  static async delete(id: string): Promise<void> {
    await drizzle.delete(collection).where(eq(collection.id, id));
  }
}