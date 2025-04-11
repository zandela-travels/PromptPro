import { Client, Account, Databases, ID } from 'node-appwrite';

// Initialize client
export const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_SECRET_KEY!);

export const account = new Account(client);
export const databases = new Databases(client);
export { ID };