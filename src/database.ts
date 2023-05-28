import { Generated } from "kysely";

interface Person {
  id: Generated<number>;
  first_name: string;
  last_name: string;
  created_at: Date;
}

export interface Database {
  person: Person;
}
