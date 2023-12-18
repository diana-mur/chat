import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LOGIN_ROUTE, MAIN_ROUTE, REG_ROUTE } from "../utils/consts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registration, login } from "../http/userAPI";
import { observer } from "mobx-react-lite"
import { Context } from "../main";

const Auth = observer(() => {
    const { user } = useContext(Context)
    const locat = useLocation()
    const navigateTo = useNavigate()
    const isLogin = locat.pathname == LOGIN_ROUTE // true в случае совпадения с LOGIN_ROUTE
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function click() {
        try {
            let data;
            // e.preventDefault()
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(name, email, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            navigateTo(MAIN_ROUTE)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <>
            <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>
            <form>
                {isLogin
                    ? <></>
                    : <>
                        <label htmlFor="">Имя</label>
                        <input
                            type="text"
                            placeholder="email"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </>}

                <label htmlFor="">Email</label>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="">Пароль</label>
                <input
                    type="password"
                    placeholder="пароль"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                {isLogin
                    ? <h4>Нет аккаунта? <Link to={REG_ROUTE}>Зарегистрируйтесь!</Link></h4>
                    : <h4>Уже есть аккаунт? <Link to={LOGIN_ROUTE}>Войдите!</Link></h4>
                }
                <button
                    onClick={click}
                >{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
            </form>
        </>
    )
})

export default Auth;