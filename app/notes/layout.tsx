import React from "react";
import NoteLoader from "./NoteLoader";

const NotesLayout = ({children} :{children: React.ReactNode}) => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            {children}
        </div>
    );
}

export default NotesLayout;