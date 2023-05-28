import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import "std/dotenv/load.ts";

import { config } from "@/config.ts";
import { Database } from "@/database.ts";

const main = async () => {
  const db = new Kysely<Database>({
    dialect: new PlanetScaleDialect(config),
  });

  const sql = await db.selectFrom("tests").selectAll().execute();
  console.log(sql);
};

if (import.meta.main) {
  main();
}
