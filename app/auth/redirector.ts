
import { redirect } from "next/navigation"


export const redirectTo = (callback:string) =>{
    console.log(9000);
    redirect(callback)
}