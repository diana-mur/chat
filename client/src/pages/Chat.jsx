import { useEffect, useRef, useState } from "react";
import { UsersList } from "../InterfaceElements/UsersList";
import { Navbar } from "../InterfaceElements/Navbar";
// import "./Chat.css"
import { chatLink, userList } from "../http/actionAPI";
import { useParams } from "react-router-dom";
// import { myUsername, userId } from "../http/userAPI";
import send from "../assets/send.svg"

function Chat() {
    const socket = useRef();
    const [user_Id, setUser_Id] = useState('') // id пользователя, который авторизован
    const [myUserName, setMyUserName] = useState('')
    const { id } = useParams() // id со строки 
    const [data, setData] = useState([]); // все сообщения
    const [dataUserList, setDataUserList] = useState([]); // список пользователей и ссылки
    const [connected, setConnected] = useState(false); // подключение вебсокета
    const [userName, setUserName] = useState(''); // имя пользователя, с которым диалог 
    const [content, setContent] = useState(''); // текст одного сообщения

    console.log("CHAT");
    const connect = () => {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            setConnected(true);
            socket.current.send(JSON.stringify({ event: 'connection', idRoom: id }))
            console.log('Подключение установлено');
        }

        // получение новых сообщений по сокету
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            if (message.event === 'history' || message.event === 'message') {
                setData(prev => [...prev, message])
            }
        }

        socket.current.onclose = () => {
            console.log('Сокет закрыт');
        }

        socket.current.onerror = () => {
            console.log('Socket произошла ошибка');
        }
    }

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
        const findUser = chat_Link.find(obj => obj.chatLink == id)
        setDataUserList(chat_Link);
        setUserName(findUser.userName)
    }

    const getUserName = async () => {
        const findUser = dataUserList.find(obj => obj.chatLink == id)
        setUserName(findUser.userName)
    }

    const sendMessage = async () => {
        const message = {
            event: 'message',
            id: user_Id,
            chat_id: id,
            content: content,
        }
        socket.current.send(JSON.stringify(message));
        setContent('');
    }

    useEffect(() => {
        connect();
        getUserId();
        getUserList();
        getMyUserName();
    }, [])

    useEffect(() => {
        setData([]);
        getUserName();
        connect()
    }, [id])

    return (
        <div className="chat">
            <UsersList userList={dataUserList} myName={myUserName} />
            <div className="chat__side">
                <Navbar text={userName} visible={true} />
                <div className="chat__messages">
                    {
                        data.map(message => (
                            <div className="message" key={message.id}>
                                <div className="title_message">
                                    <h5>
                                        {
                                            (message.userId == user_Id)
                                                ? myUserName
                                                : userName
                                        }
                                    </h5>
                                    <p>{message.createdAt}</p>
                                </div>
                                {message.content}
                            </div>
                        ))
                    }
                </div>
                <div className="input_place">
                    <input
                        className="input_message"
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)} />
                    <button onClick={sendMessage} className="sendMessage">
                        <img src={send} alt="" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat;