import { CheckCircle, CheckCircle2, CheckCircle2Icon } from "lucide-react";

interface successProps {
    message?: string
}

const FormSucces = ({message}: successProps) => {
    if(!message){
        return null
    }
    return (
        <div className="w-full text-green-500 bg-white py-2 px-3 rounded-md flex items-center gap-x-4">
          <CheckCircle2Icon width={20}/>
          <span>{message}</span>
        </div>      
    )
}

export default FormSucces;