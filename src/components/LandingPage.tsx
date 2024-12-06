import { Person } from "../icons/Person"
import { Stars } from "../icons/Stars"

export function LandingPage() {
    return <div className="flex justify-center items-center bg-black h-screen w-screen">
        <div className="font-satoshi w-screen flex justify-center items-center">
            <div className="w-1/2 h-[90vh] rounded-3xl flex flex-col items-center justify-center">
                <div className="text-3xl text-white mt-10">
                    Welcome to <span className="italic bg-purple-600 backdrop-blur-lg rounded-2xl px-2 py-1 text-center">Pulse</span>
                </div>
                <div className="mt-2">
                    <span className="text-md text-white">Connect with others in real-time</span>
                </div>
                <div className="w-[50%] flex justify-center mt-14">
                    <button className="bg-purple-600 hover:bg-purple-700 transition-all duration-100 text-white rounded-xl px-10 py-4 w-full flex justify-center items-center gap-2">
                        <Stars />
                        <span>Create New Room</span>
                    </button>
                </div>
                <div className="w-[50%] flex justify-center mt-4">
                    <button className="border border-purple-600 hover:border-black transition-all duration-100 hover:bg-purple-600 hover:text-white text-purple-600 rounded-xl px-10 py-4 w-full flex justify-center items-center gap-2">
                        <Person />
                        <span>Join Existing Room</span>
                    </button>
                </div>
            </div>
        </div>
    </div>  
}