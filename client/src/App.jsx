import { React, useRef, useState } from 'react'
import axios from "axios"
import './App.css'

function App() {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [userName, setUserName] = useState('');

  const connect = () => {
    socket.current = new WebSocket('ws://localhost:5000')

    socket.current.onopen = () => {
      setConnected(true);
      console.log('Подключение установлено');

      const message = {
        event: 'connection',
        userName,
        id: Date.now()
      }

      socket.current.send(JSON.stringify(message))
    }

    socket.current.onmessage = (event) => {
      // обмен происходит в строковом формате,
      // поэтому data парсим в сообщения
      const message = JSON.parse(event.data)
      // вернули массив, добавили сообщение, развернули старое состояние
      setMessages(prev => [message, ...prev])
    }

    socket.current.onclose = () => {
      console.log('Сервер закрыт');
    }

    socket.current.onerror = () => {
      console.log('Socket произошла ошибка');
    }
  }

  if (!connected) {
    return (
      <div>
        <input
          type="text"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          placeholder='Enter your name' />
        <button onClick={connect}>Start!</button>
      </div>
    )
  }

  const sendMessage = async () => {
    const message = {
      userName,
      message: value,
      id: Date.now(),
      event: 'message'
    }
    socket.current.send(JSON.stringify(message));
    setValue('')
  }

  return (
    <>
      <div style={{
        border: "1px solid green",
        padding: '5px'
      }}>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div>
        {messages.map(mess => (
          <div
            style={{ border: "1px solid green" }}
            key={mess.id}>
            {
              mess.event == 'connection'
                ? <>Пользователь {mess.userName} подключился</>
                : <>{mess.userName}: {mess.message}</>
            }
          </div>
        ))}
      </div>
    </>
  )
}

export default App
