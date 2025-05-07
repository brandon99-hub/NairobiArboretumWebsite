import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Use the provided database URL from environment or the Neon DB URL
const databaseUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3wEzi8yaJURt@ep-dry-brook-abn6f270-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require";

export const pool = new Pool({ connectionString: databaseUrl });
export const db = drizzle({ client: pool, schema });