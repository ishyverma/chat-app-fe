import { useEffect, useRef, useState } from "react"

interface MessageType {
  isSendByMe: boolean;
  message: string;
}

function App() {
  const websocket = useRef<WebSocket>()
  const messageRef = useRef<HTMLInputElement | null>(null)
  const [myMessage, setMyMessage] = useState<MessageType[]>([])

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080")
    ws.onmessage = (message) => {
      setMyMessage(prev => [...prev, { isSendByMe: false, message: message.data }])
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

  function sendMessage() {
    const message = messageRef.current?.value
    if (message?.trim()) {
      setMyMessage(prev => [...prev, { isSendByMe: true, message }])
      websocket.current?.send(JSON.stringify({
        type: "chat",
        roomId: "red",
        payload: {
          message
        }
      }))
    }
  }

  return <div>
    <input ref={messageRef} type="text" placeholder="Send message" />
    <button onClick={sendMessage}>Send</button>
    <div className={`flex flex-col`}>
        {myMessage.map(({ isSendByMe, message }, index) => 
        <div className={`${isSendByMe ? "self-end bg-green-400" : "self-start bg-gray-400"}`} key={index}>{message}</div>
        )}
    </div>
  </div>
}

export default App
