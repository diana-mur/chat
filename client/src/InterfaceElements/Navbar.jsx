import { Link } from "react-router-dom"
import "./Navbar.css"
import { MAIN_ROUTE } from "../utils/consts"

export const Navbar = ({ text, visible }) => {
    return (
        <div className="navbar">
            {
                visible ? <Link to={MAIN_ROUTE}>Назад</Link> : <></>
            }
            <h1>{text}</h1>
        </div>
    )
}