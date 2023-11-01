// TODO: ENSURE THIS RUNS OFF OF ONE CLIENT (code below, refactor to function importing two client)


// // this is to ensure that we only connect to one instance of Prisma

// import { PrismaClient } from "@prisma/client";

// export const prisma =
//     global.prisma ||
//     new PrismaClient()

// if(process.env.NODE_ENV !== 'production') global.prisma = prisma

import { PrismaClient as SQLitePrismaClient } from '../../prisma/generated/client-sqlite' // Client for the SQLite database
import { PrismaClient as PostgreSQLPrismaClient } from '@prisma/client'; // Prisma client for PostgreSQL

// Function to initialize the Prisma client with the appropriate provider based on environment variable
function getPrismaClient() {
  const DATABASE = process.env.DATABASE || 'sqlite'; // Set a default value or replace 'sqlite' with the default provider

  if (DATABASE === 'sqlite') {
    return new SQLitePrismaClient();
  } else if (DATABASE === 'postgresql') {
    return new PostgreSQLPrismaClient();
  } else {
    throw new Error(`Invalid database provider: ${DATABASE}`);
  }
}

// should be the right one
export const prisma = getPrismaClient();


// change to push
