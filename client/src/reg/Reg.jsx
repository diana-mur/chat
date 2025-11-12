import { useState } from "react";
import { Link } from "react-router-dom";

export const Reg = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <div className="background">
                <div className="signIn">
                    <h1>Регистрация</h1>
                    <form>
                        <label>Имя</label>
                        <input
                            className="input_form"
                            type="text"
                            placeholder="email"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
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
                        <p className="text_form">Уже есть аккаунт? <Link to={LOGIN_ROUTE} className="a_text">Войдите!</Link></p>
                        <button
                            className="button_form"
                            onClick={click}
                        >Зарегистрироваться</button>
                    </form>
                </div>
            </div>

        </>
    )
}