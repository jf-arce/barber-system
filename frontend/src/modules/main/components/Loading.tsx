export const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-lg text-gray-500">Cargando...</p>
            </div>
        </div>
    );
};
