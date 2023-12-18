import { useEffect, useState } from "react";
import axios from "axios";
import { UsersList } from "../InterfaceElements/UsersList";
import { Navbar } from "../InterfaceElements/Navbar";
import "./Chat.css"

function Chat() {
    const [data, setData] = useState([])

    // useEffect(() => {
    //     axios.get('/')
    //         .then(response => {
    //             setData(response.data);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }, []);

    return (
        <div className="chat">
            <UsersList />
            <div className="chat__side">
                <Navbar text={'Чат'} />
            </div>
        </div>
    )
}

export default Chat;