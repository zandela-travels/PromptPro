import { Models } from "node-appwrite"

export interface User extends Models.Document {
    userId: string | undefined
    email: string;
    password: string;
    name: string;
    phone?: string;
  }