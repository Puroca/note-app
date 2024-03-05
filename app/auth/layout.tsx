

const AunthLayout = ({children}:{children: React.ReactNode}) => {
    return (
        <div className="min-h-screen flex justify-center items-center w-full bg-white">
            {children}
        </div>
    );
}

export default AunthLayout;