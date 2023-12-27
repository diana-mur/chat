import { React, useContext, useEffect, useRef, useState } from 'react'
import './MainPage.css'
import { UsersList } from '../InterfaceElements/UsersList';
import { Navbar } from '../InterfaceElements/Navbar';
import "./MainPage.css"
import { myUsername, userId } from '../http/userAPI';
import { chatLink, userList } from '../http/actionAPI';
import { Context } from '../main';
import { useNavigate } from 'react-router-dom';

// Страница со списком пользователей, списком чатов
function MainPage() {
  const navigate = useNavigate()
  const [user_Id, setUser_Id] = useState('') // id пользователя, который авторизован
  const [myUserName, setMyUserName] = useState('')
  const [dataUserList, setDataUserList] = useState([]); // список пользователей и ссылки
  const [content, setContent] = useState(''); // текст одного сообщения

  const getUserId = async () => {
    const user = await userId()
    setUser_Id(user)
  }

  const getMyUserName = async () => {
    const myUserName = await myUsername()
    setMyUserName(myUserName)
  }

  const getUserList = async () => {
    let chat_Link = [];
    let user_List = await userList();
    await Promise.all(user_List.map(async (item) => {
      const link = await chatLink(item.id);
      chat_Link.push({ userId: item.id, userName: item.name, chatLink: link });
    }));
    setDataUserList(chat_Link);
  }

  useEffect(() => {
    getUserId();
    getUserList();
    getMyUserName();
  }, [])

  return (
    <div className='mainPage'>
      <UsersList userList={dataUserList} myName={myUserName} />
      <div className='mainPage__side'>
        <Navbar text={'Чаты'} />
        <div>
          {
            dataUserList.map(user => (
              <div onClick={() => {
                navigate(`/chats/${user.chatLink}`)
              }} className="user" key={user.userId}>
                <h5>{user.userName}</h5>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default MainPage
