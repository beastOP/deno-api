export const APP_HOST = Deno.env.get("HOST") || "127.0.0.1";
export const DB_NAME = Deno.env.get("DB") || "test";
export const MONGO_URI = Deno.env.get("MONGO_URI") ||
  "mongodb://localhost:27017";
export const APP_PORT = Deno.env.get("PORT") || 4000;
