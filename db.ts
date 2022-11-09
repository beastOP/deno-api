import { MongoClient } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { MONGO_URI } from "./config.ts";

const client = new MongoClient();
console.log(MONGO_URI);
await client.connect(MONGO_URI);
const db = await client.database();

export default db;
