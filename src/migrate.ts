import { Kysely, Migrator, Migration, MigrationProvider } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import "std/dotenv/load.ts";

import { config } from "@/config.ts";
import { Database } from "@/database.ts";

class FileMigrationProvider implements MigrationProvider {
  async getMigrations() {
    const migrations: Record<string, Migration> = {};
    const migrationFolder = `${Deno.cwd()}/migrations`;
    for await (const dirEntry of Deno.readDir(migrationFolder)) {
      if (dirEntry.isFile && dirEntry.name.endsWith(".migrate.ts")) {
        const migration = await import(`${migrationFolder}/${dirEntry.name}`);
        const migrationKey = dirEntry.name;
        migrations[migrationKey] = migration;
      }
    }
    return migrations;
  }
}

const migrate = async () => {
  const db = new Kysely<Database>({
    dialect: new PlanetScaleDialect(config),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider(),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
  }

  await db.destroy();
};

if (import.meta.main) {
  migrate();
}
