import { BrowserRouter } from "react-router-dom"
import AppRouter from "./components/Router"
import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import { Context } from "./main"
import { check } from "./http/userAPI"

export const App = observer(() => {
    const { user } = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check()
            .then(data => {
                console.log(data.id);
                user.setUser(true)
                user.setIsAuth(true)
            }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <div>Загрузка</div>
    }

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    )
})