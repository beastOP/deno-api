import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { APP_HOST, APP_PORT } from "./config.ts";
import router from "./router.ts";

const app = new Application();
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.response.status = String(ctx.response.status)[0] !== "2"
      ? ctx.response.status
      : 500;
    ctx.response.body = { error: error.message };
  }
});
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(`${APP_HOST}:${APP_PORT}`);
console.log(`${APP_HOST}:${APP_PORT}`);
