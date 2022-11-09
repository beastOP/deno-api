import { DenonConfig } from "https://deno.land/x/denon@2.5.0/mod.ts";
import { config as env } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

const config: DenonConfig = {
  allow: ["net", "read", "env", "write"],
  unstable: true,
  scripts: {
    start: {
      cmd: "deno run server.ts",
      desc: "Run my webserver",
      env: env(),
    },
  },
};

export default config;
