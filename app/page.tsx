import Navbar from "./components/nav"
// Note: Le composant Image n'est plus nécessaire si on utilise uniquement <img>
// import Image from "next/image" 

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 text-black">
            <Navbar/>
            <div className="pt-20 md:pt-28 lg:pt-36 flex flex-col justify-center items-center ">
                
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-center tracking-tight mb-2">
                    Petita Lumière
                </h1>
                
                <h2 className="text-lg sm:text-xl md:text-3xl text-center font-semibold tracking-tight mb-6">
                    Parce qu'éclairer avec goût, c'est tout un art.
                </h2>
                
                <div className="pt-4">
                    <a href="/shop" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold transition-colors shadow-md">
                        Accéder au catalogue
                    </a>
                </div>

                <img 
                    src="/petita_header.PNG" 
                    alt="Ancienne lampe à lumière chaude" 
                    className="hidden md:block pt-12 md:pt-24 max-w-full h-auto"
                />
                
            </div>
        </div>
    )
}