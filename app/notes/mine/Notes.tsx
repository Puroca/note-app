'use client'
import { UserSession } from "@/app/notes/create/Form";
import NotesTable from "./NotesTable";

const Notes = ({user}:UserSession) => {
    return (
      <div className="min-h-screen text-slate-700  ">
        <div className="w-3/4  mx-auto text-center my-10">
          <h1 className="text-3xl font-medium">Vos notes</h1>
          <p className="my-3">
            retrouvez ici une liste exhaustive de toutes les notes que vous avez prises
          </p>
        </div>
        <div className="">
            <NotesTable user={user} />
        </div>
      </div>
    )
}

export default Notes;