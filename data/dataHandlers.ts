import { dbConnect } from "@/lib/dbconnect";
import { User } from "@/models/UserModel";
import { UserInterface } from "@/schemas";

export const createUser = async (user: UserInterface) =>{
    const {name, email, password} = user
    dbConnect()
    const userData = new User({
        name,
        email,
        password
    })

    await userData.save()
    
}