import { observer } from 'mobx-react-lite'
import './UsersList.css'
import { useContext } from 'react'
import { Context } from '../main'
import { useNavigate } from 'react-router-dom'

export const UsersList = observer(({userList, myName}) => {
    const { user } = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        localStorage.removeItem('token')
        user.setUser({})
        user.setIsAuth(false)
        location.reload()
    }

    return (
        <div className="sidePanel">
            <h1 className='sidePanel_title'>Пользователи</h1>
            <div className="usersList">
                {userList.map(user => (
                    <div onClick={() => {
                        navigate(`/chats/${user.chatLink}`)
                    }} className="user" key={user.userId}>
                        <h5>{user.userName}</h5>
                    </div>
                ))}
            </div>
            <div className="master">
                <h4>{myName}</h4>
                <button onClick={() => logOut()} className='btnOutdoor'>Выйти</button>
            </div>
        </div>
    )
})