import type { INewUser, IUser } from "@/types";
import { ID } from "appwrite";
import { account } from "./config";



export async function createUser(user:INewUser){
    try {
        const newAccount=await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.username

        )
        console.log(newAccount);
    } catch (error) {
        console.log(error);
        return error;
        
    }
    

}