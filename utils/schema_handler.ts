import { Collection } from "../types.ts";
import getJson from "./common/read_json.ts";
import { resolve } from "https://deno.land/std@0.34.0/path/mod.ts";
import db from "../db.ts";
// import writeJson from "./common/write_json.ts";
// import { deepmerge } from "https://deno.land/x/deepmergets@v4.2.2/dist/deno/index.ts";

export async function addToSchema(
  new_collection: Collection,
  // deno-lint-ignore no-explicit-any
): Promise<{ error?: any }> {
  // const p = resolve("schema.test.json");
  // const { data, error } = await getJson(p);
  // if (error) {
  //   return { error: "Schema was not added" };
  // }
  try {
    // data.collections.push(new_collection);
    await db.collection("schema").insertOne(new_collection);
    // const { error: e } = await writeJson(p, data);
    // if (e) {
    //   return { error: "Schema was not updated" };
    // }
  } catch (error) {
    return { error: error.message };
  }
  return {};
}

export const updateSchema = async (
  // deno-lint-ignore no-explicit-any
  collection_name: any,
  // deno-lint-ignore no-explicit-any
  new_collection: Collection | any,
  // deno-lint-ignore no-explicit-any
): Promise<{ error?: any }> => {
  const p = resolve("schema.test.json");
  const { data, error } = await getJson(p);
  if (error) {
    return { error: "Schema was not updated" };
  }
  try {
    const f: Collection | undefined = (data.collections as Collection[]).find((
      val,
    ) => val.name == collection_name);
    // deno-lint-ignore no-explicit-any
    const filtered = (data.collections as Collection[]).filter((i: any) =>
      i.name != collection_name
    );

    if (f) {
      filtered.push({ ...f, ...new_collection });
    } else {
      return { error: "cannot find the collection name" };
    }
    // const { error: e } = await writeJson(p, filtered);
    // if (e) {
    //   return { error: "Schema was not updated" };
    // }
  } catch (error) {
    return { error: error.message };
  }
  return {};
};

// const ffTransform = (a: any): any => {
//   const result = [];
//   for (const c of a) {
//     const r = Object.values(c);
//     result.push(r);
//   }
//   return result;
// };
