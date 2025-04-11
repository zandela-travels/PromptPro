declare namespace NodeJS {
  interface ProcessEnv {
    PROJECT_ID: string;
    API_KEY: string;
    DATABASE_KEY: string;
    USERS_COLLECTION_ID: string;
    NEXT_PUBLIC_ENDPOINT: string;
  }
} 