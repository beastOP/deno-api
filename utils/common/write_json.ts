export default async function writeJson(
  filePath: string,
  // deno-lint-ignore no-explicit-any
  o: any,
  // deno-lint-ignore no-explicit-any
): Promise<{ error?: any }> {
  try {
    await Deno.writeTextFile(filePath, JSON.stringify(o));
  } catch (error) {
    return { error: error.message };
  }
  return {};
}
