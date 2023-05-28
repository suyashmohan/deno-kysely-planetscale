// deno-lint-ignore-file no-explicit-any
import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db
    .insertInto("person")
    .values({
      first_name: "Ajay",
      last_name: "Sharma",
    })
    .execute();
}

export async function down(_db: Kysely<any>): Promise<void> {}
