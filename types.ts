import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";

const FIELD_TYPES = [
  "text",
  "number",
  "longtext",
  "richtext",
  "integer",
  "email",
] as const;

const typeEnum = z.enum(FIELD_TYPES);

export const field = z.object({
  name: z.string().max(255),
  type: typeEnum,
});

export const collection = z.object({
  name: z.string().max(255),
  fields: z.array(field),
});

export type Field = z.infer<typeof field>;

export type Collection = z.infer<typeof collection>;

export type Schema = {
  name: string;
  collections: Collection[];
};
