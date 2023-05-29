import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { Hono } from "hono";
import { serve } from "std/http/server.ts";
import "std/dotenv/load.ts";

import { config } from "@/config.ts";
import { Database } from "@/database.ts";

const main = async () => {
  const db = new Kysely<Database>({
    dialect: new PlanetScaleDialect(config),
  });

  const app = new Hono();
  app.get("/", async (c) => {
    const sql = await db.selectFrom("person").selectAll().execute();
    return c.json(sql);
  });
  await serve(app.fetch);
};

if (import.meta.main) {
  main();
}
