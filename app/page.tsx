import Navbar from "@/components/nav"
import Footer from "@/components/footer"
import Spotlight  from "@/components/ui/spotlight"
import { Highlighter } from "@/components/ui/highlighter"


export default function Home() {
    return (
        <>
        <div className="min-h-screen bg-gray-50 text-black">
            <div className=" md:pt-28 lg:pt-36 flex flex-col justify-center items-center ">
            <Navbar/> 
            <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="rgb(255, 244, 100)" />
                <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-28 ">
                    <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-950 to-neutral-500 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
                        Éclairer avec <Highlighter action="underline" color="#FF9800">goût</Highlighter>,<br /> c'est tout un art.
                    </h1>
                    <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-700">
                    Passionnés de luminaires, nous créons des lustres, appliques et lampes où se mêlent les opalines, les verres de Clichy, les tulipes ou encore les globes. Festonné, bullé, ambré ou soufflé, pour quel abat jour vous craquerez ?
                    </p>

                    <div className="flex justify-center items-center pt-6">
                        <a href="/catalogue" className="bg-amber-400 rounded-xl text-neutral-600 font-semibold px-4 py-3">Accéder au catalogue</a>
                    </div>
                </div>

                <img 
                    src="/petita_header.PNG" 
                    alt="Ancienne lampe à lumière chaude" 
                    className="hidden md:block pt-12 md:pt-24 max-w-full h-auto"
                />
                
            </div>
        </div>
        <Footer/>
        </>
    )
}
