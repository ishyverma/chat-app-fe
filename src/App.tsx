import { useEffect, useRef, useState } from "react"

interface MessageType {
  isSendByMe: boolean;
  message: string;
  CurrentTime: string;
}

function App() {
  const websocket = useRef<WebSocket>()
  const messageRef = useRef<HTMLInputElement | null>(null)
  const [myMessage, setMyMessage] = useState<MessageType[]>([])
  const messageEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080")
    ws.onmessage = (message) => {
      setMyMessage(prev => [...prev, { isSendByMe: false, message: message.data, CurrentTime: CurrentTime() }])
    }

    ws.onopen = () => {
      websocket.current = ws
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }

    return () => {
      ws.close()
    }

  }, [])

  useEffect(() => {
    ScrollToBottom()
  }, [myMessage])

  function sendMessage() {
    const message = messageRef.current?.value
    if (message?.trim()) {
      setMyMessage(prev => [...prev, { isSendByMe: true, message, CurrentTime: CurrentTime() }])
      websocket.current?.send(JSON.stringify({
        type: "chat",
        roomId: "red",
        payload: {
          message
        }
      }))
    }
  }

  function CurrentTime() {
    const date = new Date()
    const hour = date.getHours().toString().padStart(2, "0")
    const min = date.getMinutes().toString().padStart(2, "0")
    const sec = date.getSeconds().toString().padStart(2, "0")
    return `${hour}:${min}:${sec}`
  }

  function ScrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return <div className="flex justify-center bg-black h-screen">
    <div className="w-1/2 border border-white">
      <div className="h-[90vh] text-black font-satoshi p-4 overflow-y-auto" ref={messageEndRef}>
        <div className="flex flex-col">
          {myMessage.map(({message, CurrentTime, isSendByMe}, index) => 
            <div className="mt-2 flex flex-col">
              <div className={`text-white ${isSendByMe ? 'self-end' : 'self-start'} mb-1`}>
                <UserAvatar />
              </div>
              <span key={index} className={`${isSendByMe ? 'bg-green-500 self-end' : 'bg-white self-start'} w-auto px-2 rounded-md py-2 text-left`}>
                {message}
              </span>
              <div className={`text-white text-xs mt-2 ${isSendByMe ? 'self-end' : 'self-start'}`}>
                {CurrentTime}
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="flex gap-1 border-t-[1px] p-2">
          <input ref={messageRef} type="text" placeholder="Send Message..." className="w-full bg-gray-700 border border-gray-400 font-satoshi rounded-3xl text-md px-4 text-white focus:outline-none" />
          <div onClick={sendMessage} className="bg-green-600 flex justify-center items-center w-10 h-10 rounded-full cursor-pointer hover:bg-green-700 transition-all duration-75">
            <SendMessage />
          </div>
        </div>
      </div>
    </div>
  </div>
}

function SendMessage() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
  </svg>

}

function UserAvatar() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>

}

export default App
