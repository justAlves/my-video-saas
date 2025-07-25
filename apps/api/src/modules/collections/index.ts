import { User } from "better-auth/*";
import Elysia, { t } from "elysia";
import { CollectionsService } from "./services";

export const collectionsController = new Elysia()
  .decorate("user", null as unknown as User)
  .get("/collections", async ({ user, query }) => {
    if(query.organization){
      const collections = await CollectionsService.getByOrganizationId(query.organization);

      return collections;
    }

    const collections = await CollectionsService.getByUserId(user.id);

    return collections
  }, {
    auth: true,
    query: t.Object({
      organization: t.Optional(t.String()),
    })
  })
  .post('/collections', async ({ body }) => {
    const data = body;
    const collection = await CollectionsService.create(data);
    return collection;
  }, {
    auth: true,
    body: t.Object({
      name: t.String(),
      description: t.Optional(t.String()),
      userId: t.String(),
      organizationId: t.Optional(t.String()),
    })
  })
  .get("/collections/:id", async ({ params }) => {
    const collection = await CollectionsService.getById(params.id);

    return collection
  }, {
    auth: true,
    body: t.Object({
      id: t.String(),
    })
  })
  .patch("/collections/:id", async ({ params, body }) => {
    const updatedCollection = await CollectionsService.update(body, params.id);
    return updatedCollection;
  }, {
    auth: true,
    body: t.Object({
      name: t.String(),
      description: t.String(),
    }),
    params: t.Object({
      id: t.String(),
    }),
  })
  .delete("/collections/:id", async ({ params }) => {
    await CollectionsService.delete(params.id);
  }, {
    params: t.Object({
      id: t.String()
    })
  })