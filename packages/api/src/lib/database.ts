import type { Logger as drizzleLogger } from 'drizzle-orm/logger';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../../schema/schema';
import type { userSchema } from '../../schema/schema';
import env from './env';
import { logger } from './logger';

const DB_ERRORS = {
    DUPLICATE_KEY: 'ER_DUP_ENTRY',
};

export interface DatabaseError {
    type: string;
    message: string;
    stack?: string;
    code: string;
    errno: number;
    sql: string;
    sqlState: string;
    sqlMessage: string;
}

export type User = typeof userSchema.$inferSelect;
export type NewUser = typeof userSchema.$inferInsert;

class DBLogger implements drizzleLogger {
    logQuery(query: string, params: unknown[]): void {
        logger.debug({ query, params });
    }
}


const db = drizzle(env.DATABASE_URL, { schema: schema, logger: new DBLogger() });
export { DB_ERRORS, db };
