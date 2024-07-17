import { PrismaClient as PrismaClientEdge } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;


const prismaClientSingleton = () => {
  console.log('[Db connection created] process.env.NODE_ENV:', process.env.NODE_ENV);
  return new PrismaClientEdge({
    log: [/*'query',*/ 'info', 'warn', 'error'],
    errorFormat: 'pretty',
  })
    .$extends(withAccelerate())
}

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices
const db = globalThis.prismaGlobal ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db;
