import { Document, ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { z } from "https://deno.land/x/zod@v3.16.1/index.ts";
import db from "./db.ts";
// import { Collection, collection, Schema } from "./types.ts";
import { collection } from "./types.ts";

// import getJson from "./utils/common/read_json.ts";
import { addToSchema } from "./utils/schema_handler.ts";

const router = new Router();

// const { data: schemas, error } = await getJson<Schema>("./schema.test.json");

// if (error) {
//   console.log(error);
// }

const collections: Document[] =
  await db.collection("schema").find().toArray() || [];

console.log(collections);

for (const clx of collections) {
  const route_name = clx.name.replaceAll(" ", "").toLocaleLowerCase();

  // deno-lint-ignore no-explicit-any
  const r: any = {};

  for (const field of clx.fields) {
    const isNumber = (f: string) => f == "number" ? true : false;

    r[field.name] = isNumber(field.type) ? z.number() : z.string();
  }

  const route_schema = z.object(r);

  router.get(`/${route_name}`, async (ctx) => {
    const data = await db.collection(route_name).find().toArray();
    ctx.response.status = 200;
    ctx.response.body = { data };
  });

  router.get(`/${route_name}/:id`, async (ctx) => {
    const data = await db.collection(route_name).findOne({
      _id: new ObjectId(ctx.params.id),
    });
    if (!data) {
      ctx.response.status = 404;
      throw new Error("cannot find the requested data");
    }
    ctx.response.status = 200;
    ctx.response.body = { data };
  });

  router.post(`/${route_name}`, async (ctx) => {
    const body = ctx.request.body({ type: "json" });
    const value = await body.value;
    const data = route_schema.parse(value);
    try {
      const _id = await db.collection(route_name).insertOne(data);
      ctx.response.status = 201;
      ctx.response.body = { data: { _id } };
    } catch (error) {
      throw new Error(error.message);
    }
  });

  router.put(`/${route_name}/:id`, async (ctx) => {
    const body = ctx.request.body({ type: "json" });
    const value = await body.value;
    const deep_partial_route_schema = route_schema.deepPartial();
    const data = deep_partial_route_schema.parse(value);
    try {
      await db.collection(route_name).updateOne({
        _id: new ObjectId(ctx.params.id),
      }, { $set: data });
      ctx.response.status = 201;
    } catch (error) {
      throw new Error(error.message);
    }
  });

  router.delete(`/${route_name}/:id`, async (ctx) => {
    try {
      await db.collection(route_name).deleteOne({
        _id: new ObjectId(ctx.params.id),
      });
      ctx.response.status = 200;
    } catch (error) {
      ctx.response.status = 500;
      throw new Error(error.message);
    }
  });
}

router.post(`/collection`, async (ctx) => {
  const body = ctx.request.body({ type: "json" });
  const value = await body.value;
  const new_collection = collection.parse(value);
  const { error } = await addToSchema(new_collection);
  if (error) {
    ctx.response.status = 400;
    throw new Error(error);
  }
  ctx.response.status = 201;
});

// router.put(`/collection/:name`, async (ctx) => {
//   const body = ctx.request.body({ type: "json" });
//   const value = await body.value;
//   const new_collection = collection.deepPartial().parse(value);
//   const { error } = await updateSchema(ctx.params.name, new_collection);
//   if (error) {
//     ctx.response.status = 400;
//     throw new Error(error);
//   }
//   ctx.response.status = 201;
// });

router.get(`/collection`, (ctx) => {
  const data = collections;
  ctx.response.status = 200;
  ctx.response.body = { data };
});

router.get("/", (ctx) => {
  ctx.response.body = db.name;
});

export default router;
