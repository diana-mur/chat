import { useContext, useEffect, useState } from "react";
import { LOGIN_ROUTE, MAIN_ROUTE, REG_ROUTE } from "../utils/consts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registration, login } from "../http/userAPI";
import { observer } from "mobx-react-lite"
import { Context } from "../main";
import "./Auth.css"

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
        <div className="background">
            <div className="signIn">
                <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>
                <form>
                    {isLogin
                        ? <></>
                        : <>
                            <label>Имя</label>
                            <input
                                className="input_form"
                                type="text"
                                placeholder="email"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </>}

                    <label>Email</label>
                    <input
                        className="input_form"
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label>Пароль</label>
                    <input
                        className="input_form"
                        type="password"
                        placeholder="пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {isLogin
                        ? <p className="text_form">Нет аккаунта? <Link to={REG_ROUTE} className="a_text">Зарегистрируйтесь!</Link></p>
                        : <p className="text_form">Уже есть аккаунт? <Link to={LOGIN_ROUTE} className="a_text">Войдите!</Link></p>
                    }
                    <button
                        className="button_form"
                        onClick={click}
                    ><Link to={MAIN_ROUTE} className="a_form">{isLogin ? 'Войти' : 'Зарегистрироваться'}</Link></button>
                </form>
            </div>
        </div>
    )
})

export default Auth;