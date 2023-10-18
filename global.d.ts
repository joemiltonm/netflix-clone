import type { PrismaClient } from '@prisma/client';
import type { MongoClient } from 'mongodb';

declare global {
  namespace globalThis {
    var prismadb: PrismaClient
  }
}

//There can be a global variable called prismadb of type PrismaClient. By using this declaration, 
//you're informing TypeScript that such a global variable might exist. However, the declaration itself doesn't create the variable; 
//some other part of your code would be responsible for actually initializing and assigning prismadb to the globalThis object.

