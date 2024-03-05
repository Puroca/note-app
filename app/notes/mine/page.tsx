import Notes from "@/app/notes/mine/Notes";
import { auth } from "@/auth";

const MyNotesPage = async() => {
    const session = await auth()
    const user = session?.user
    return (
      <Notes user= {user} />
    )
}

export default MyNotesPage;