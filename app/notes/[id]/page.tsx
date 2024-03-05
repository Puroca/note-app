import NoteCard from "./NoteCard"

const Notepage = ({params}:{params:{id:string}}) => {
    const id = params.id
    return (
        <NoteCard id={id} />
    );
}

export default Notepage;