import { User } from "./models";
import { connectToDb } from "./utils";


export const fetchUsers = async () =>{

    try{
        connectToDb()
        const users = await User.find();
        return users
    }
    catch(err){
        console.log(err)
        throw new Error("failed to fetch users!")
    }

}

