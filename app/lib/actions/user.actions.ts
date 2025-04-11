/*'use server';

import { Client, Databases, Query, ID } from 'node-appwrite';
import { hash, compare } from 'bcryptjs';

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

const databases = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID!; // Replace with your database ID
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_USERs_COLLECTION_ID!; // Replace with your collection ID

interface UserData {
  username: string;
  email: string;
  phone: string;
  password: string;
}

export async function loginUser({ email, password }: { email: string; password: string }) {
  try {
    // Find user by email
    const response = await databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.equal('email', email)]
    );

    if (response.documents.length === 0) {
      throw new Error('User not found');
    }

    const user = response.documents[0];
    
    // Compare passwords
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    return {
      id: user.$id,
      name: user.username,
      email: user.email,
      plan: user.plan || 'Free' // Default to free if not set
    };
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Login failed. Please check your credentials.');
  }
}

export async function registerUser(data: { username: string; email: string; phone: string; password: string }) {
  try {
    // Check if user already exists
    const existingUser = await databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.equal('email', data.email)]
    );

    if (existingUser.documents.length > 0) {
      throw new Error('User already exists with this email');
    }

    // Hash password
    const hashedPassword = await hash(data.password, 12);

    // Create user document
    const user = await databases.createDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      ID.unique(),
      {
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        plan: 'Free' // Default plan
      }
    );

    return {
      id: user.$id,
      name: data.username,
      email: data.email,
      plan: 'Free'
    };
  } catch (error: any) {
    console.error('Registration error:', error);
    throw new Error(error.message || 'Registration failed. Please try again.');
  }
}

export const getCurrentUser = async (email: string) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.equal('email', email)]
    );

    if (response.documents.length === 0) {
      return null;
    }

    const user = response.documents[0];
    return {
      id: user.$id,
      name: user.username,
      email: user.email,
      plan: user.plan || 'Free'
    };
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
};*/