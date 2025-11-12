import { useState } from "react";
import { Link } from "react-router-dom";

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="background">
            <div className="signIn">
                <h1>Вход</h1>
                <form>
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
                    <p className="text_form">Нет аккаунта? <Link to={"/reg"} className="a_text">Зарегистрируйтесь!</Link></p>
                    <button
                        className="button_form"
                        onClick={click}
                    >Войти</button>
                </form>
            </div>
        </div>
    )
}

export default Auth;