import { observer } from 'mobx-react-lite'
import './UsersList.css'
import { useContext } from 'react'
import { Context } from '../main'
import { useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE } from '../utils/consts'
import { check } from '../http/userAPI'

export const UsersList = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        localStorage.removeItem('token')
        user.setUser({})
        user.setIsAuth(false)
        location.reload()
        // navigate(LOGIN_ROUTE)
    }

    return (
        <div className="sidePanel">
            <h1>Пользователи</h1>
            <div className="usersList">
                <div className="user">
                    <h5>Имя Пользователя</h5>
                </div>
            </div>
            <div className="master">
                <h4>Имя аккаунта</h4>
                <button onClick={() => logOut()} className='btnOutdoor'>Выйти</button>
            </div>
        </div>
    )
})