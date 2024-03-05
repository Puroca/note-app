interface LoadingProps{
    message: string
}
const NoteLoader = ({message}:LoadingProps) => {
    return (
        <div className="bg-black bg-opacity-50 flex justify-center items-center fixed left-0 top-0 h-full w-full ">
            <div className="p-5 bg-white rounded-md ">
                {message}
            </div>
        </div>
    );
}

export default NoteLoader;