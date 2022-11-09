import loadJsonFile from "https://deno.land/x/load_json_file@v1.0.0/mod.ts";

// deno-lint-ignore no-explicit-any
export default async function getJson<T = any>(
  filePath: string,
  // deno-lint-ignore no-explicit-any
): Promise<{ data?: any; error?: any }> {
  try {
    return { data: await loadJsonFile<T>(filePath) };
  } catch (error) {
    // /Users/omkarpatil/Development/baas/api/schema.test.json
    console.log(error);
    return { error: error.message };
  }
}
