export const config = {
  host: Deno.env.get("DATABASE_HOST"),
  username: Deno.env.get("DATABASE_USERNAME"),
  password: Deno.env.get("DATABASE_PASSWORD"),
};
