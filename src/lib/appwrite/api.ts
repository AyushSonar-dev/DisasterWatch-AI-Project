import type { INewUser, IUser } from "@/types";
import { Databases, ID, Models } from "appwrite";
import { account, appwriteConfig } from "./config";



export async function createUser(user: INewUser): Promise<Models.User<Models.Preferences>> {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.username
    );
    return newAccount; // ✅ return it so caller can use it
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // better to throw than return error
  }
}

export async function  signinAccount(user: {email:string,password:string}): Promise<Models.Session> {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session; // ✅ return it so caller can use it
  } catch (error) {
    console.error("Error signing in:", error);
    throw error; // better to throw than return error
  } 
}
