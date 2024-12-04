import { useEffect, useRef, useState } from "react"

function App() {
  const websocket = useRef<WebSocket>()
  const [otherMessage, setOtherMessage] = useState<string[]>([])
  const messageRef = useRef<HTMLInputElement | null>(null)
  const [myMessage, setMyMessage] = useState<string[]>([])

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080")
    ws.onmessage = (message) => {
      setOtherMessage(prev => [...prev, message.data])
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
      setMyMessage(prev => [...prev, message])
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
    <div className={`flex justify-between`}>
        <div>
        {otherMessage.map((items, index) => <div className="bg-gray-400" key={index}>
          {items}
        </div>)}
      </div>
      <div>  
        {myMessage.map((items, index) => <div className="bg-green-400" key={index}>
          {items}
        </div>)}
      </div>
    </div>
  </div>
}

export default App
