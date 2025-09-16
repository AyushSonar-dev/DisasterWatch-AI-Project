import { Account, Avatars, Client, Storage,Databases } from "appwrite"

export const appwriteConfig = {
  url: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1", 
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "", 
  dbId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
  postCollectionId: process.env.NEXT_PUBLIC_APPWRITE_POSTS_ID || "",
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_ID || "",
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
  storageId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID || ""
}

const client = new Client()
  .setEndpoint(appwriteConfig.url ) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID




export  const account= new Account(client);
export  const db= new Databases(client);
export  const storage= new Storage(client);
export  const avatar= new Avatars(client);