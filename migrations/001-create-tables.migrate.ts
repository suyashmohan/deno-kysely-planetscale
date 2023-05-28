// deno-lint-ignore-file no-explicit-any
import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("person")
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("first_name", "varchar(120)", (col) => col.notNull())
    .addColumn("last_name", "varchar(120)", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("person").execute();
}
