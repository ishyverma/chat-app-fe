import { Back } from "../icons/Back";

export function CreateRoom() {
    return <div className="bg-black h-screen flex justify-center items-center">
        <div className="flex w-1/3 h-[60vh] justify-start items-center text-white font-satoshi">
            <div className="w-full">
                <div className="flex gap-1 cursor-pointer text-white hover:text-gray-300 transition-all duration-100">
                    <div className="flex self-center">
                        <Back />
                    </div>
                    <span className="text-sm">Back</span>
                </div>
                <div className="mt-10">
                    <span className="text-white text-3xl font-semibold">Create a New Room</span>
                </div>
                <div>
                    <span className="text-white text-sm">Set up your chat room preferences</span>
                </div>
                <div className="mt-10">
                    <label className="text-white text-sm " htmlFor="roomName">Room Name</label>
                    <input type="text" placeholder="Enter room name" className="bg-[#1F2937] border border-[#374151] text-sm px-2 py-2 w-full rounded-lg focus:outline-none mt-1" />
                </div>
                <div className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-100 text-center py-2 rounded-lg mt-10">
                    <button className="text-center text-sm">Create Room</button>
                </div>
            </div>
        </div>
    </div>
}