function Pedidos() {
    return (
        <>
            <div className="bg-[#151515] min-h-screen flex justify-center p-10 md:p-15">
                <div className="w-full max-w-none rounded-lg flex flex-col space-y-8">
                    
                    {/* Pedidos en curso */}
                    <div className="w-full bg-[#fbfbf3] p-6 rounded-lg">
                        <h1 className="text-xl font-bold p-2 rounded-lg mb-6">
                            Pedidos en curso
                        </h1>
                        <div className="flex items-center justify-center w-full p-8 rounded-lg">
                            {/* Contenido de pedidos en curso */}
                        </div>
                    </div>

                    {/* Historial de pedidos */}
                    <div className="w-full bg-[#fbfbf3] p-6 rounded-lg">
                        <h1 className="text-xl font-bold p-2 rounded-lg mb-6">
                            Historial de pedidos
                        </h1>
                        <div className="flex items-center justify-center w-full p-8 rounded-lg">
                            {/* Contenido del historial de pedidos */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Pedidos;
