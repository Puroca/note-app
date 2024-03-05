
import Form from "@/app/auth/login/Form"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Login | NoteApp',
}
const LoginPage = () => {
    return <Form />
}

export default LoginPage;