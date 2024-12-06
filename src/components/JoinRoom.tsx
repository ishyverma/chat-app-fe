import { useEffect, useState } from "react";
import { Back } from "../icons/Back";
import { Search } from "../icons/Search";

interface RoomType  {
    roomName: string;
    numberOfActiveUsers: number;
}

export function JoinRoom() {
    const [rooms, setRooms] = useState<RoomType[]>([{roomName: "Shyam", numberOfActiveUsers: 10}])
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080")
        ws.onmessage = (message) => {
            setRooms(message.data)
        }
        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: "createRoom"
            }))
            ws.send(JSON.stringify({
                type: "getRooms"
            }))
        }
    }, [])
    useEffect(() => {
        console.log(rooms)
    }, [rooms])
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
                    <span className="text-white text-3xl font-semibold">Join a Room</span>
                </div>
                <div>
                    <span className="text-white text-sm">Browse available chat rooms or enter a room code</span>
                </div>
                <div className="mt-10 relative">
                    <input type="text" placeholder="Search rooms..." className="bg-[#1F2937] border border-[#374151] text-sm px-10 py-2 w-full rounded-lg focus:outline-none mt-1" />
                    <div className="absolute top-[13px] text-[#9BA3AF] left-3">
                        <Search />
                    </div>
                </div>
                {rooms && rooms.map(room => <div className="w-full hover:bg-[#262626] transition-all duration-100 bg-[#1F2937] mt-10 py-5 rounded-xl px-5 flex justify-between">
                    <div>
                        <div className="">
                            <span className="text-white text-xl">{room.roomName}</span>
                        </div>
                        <div>
                            <span className="text-white text-xs">{room.numberOfActiveUsers} Members</span>
                        </div>
                    </div>
                    <div className="self-center text-purple-600 border-[1.5px] border-purple-600 hover:text-white hover:bg-purple-700 hover:border-purple-700 px-5 py-2 rounded-xl cursor-pointer">
                        <button className="font-medium text-sm">Join</button>
                    </div>
                </div> )}
                {/* <div className="w-full hover:bg-[#262626] transition-all duration-100 bg-[#1F2937] mt-10 py-5 rounded-xl px-5 flex justify-between">
                    <div>
                        <div className="">
                            <span className="text-white text-xl">{roomName}</span>
                        </div>
                        <div>
                            <span className="text-white text-xs">{numberOfActiveUsers} Members</span>
                        </div>
                    </div>
                    <div className="self-center text-purple-600 border-[1.5px] border-purple-600 hover:text-white hover:bg-purple-700 hover:border-purple-700 px-5 py-2 rounded-xl cursor-pointer">
                        <button className="font-medium text-sm">Join</button>
                    </div>
                </div> */}
            </div>
        </div>
    </div>
}