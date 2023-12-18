import { React, useRef, useState } from 'react'
import axios from "axios"
import './MainPage.css'
import { UsersList } from '../InterfaceElements/UsersList';
import { Navbar } from '../InterfaceElements/Navbar';
import "./MainPage.css"

// Страница со списком пользователей, списком чатов
function MainPage() {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [userName, setUserName] = useState('');

  // const connect = () => {
  //   socket.current = new WebSocket('ws://localhost:5000')

  //   socket.current.onopen = () => {
  //     setConnected(true);
  //     console.log('Подключение установлено');

  //     const requestData = {
  //       action: 'getUserList',
  //       data: {}
  //     }

  //     // const message = {
  //     //   event: 'connection',
  //     //   userName,
  //     //   id: Date.now()
  //     // }

  //     socket.current.send(JSON.stringify(requestData))
  //   }

  //   socket.current.onmessage = (event) => {
  //     // обмен происходит в строковом формате,
  //     // поэтому data парсим в сообщения
  //     const message = JSON.parse(event.data)
  //     // вернули массив, добавили сообщение, развернули старое состояние
  //     setMessages(prev => [message, ...prev])
  //   }

  //   socket.current.onclose = () => {
  //     console.log('Сервер закрыт');
  //   }

  //   socket.current.onerror = () => {
  //     console.log('Socket произошла ошибка');
  //   }
  // }

  // const sendMessage = async () => {
  //   const message = {
  //     userName,
  //     message: value,
  //     id: Date.now(),
  //     event: 'message'
  //   }
  //   socket.current.send(JSON.stringify(message));
  //   setValue('')
  // }

  return (
    <div className='mainPage'>
      <UsersList />
      <div className='mainPage__side'>
        <Navbar text={'Чаты'} />
      </div>
    </div>
  )
}

export default MainPage
