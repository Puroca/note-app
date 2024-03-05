import UpdateForm from "./Form";

const UpdatePage = ({params}:{params:{id:string}}) => {
    const noteId = params.id
    return (
        <UpdateForm id={noteId} />
    );
}

export default UpdatePage;