import { BrowserRouter, Outlet, createBrowserRouter } from "react-router-dom"
import AppRouter from "./components/Router"
import { useContext, useEffect, useState } from "react"
import { Context } from "./main"
// import { check } from "./http/userAPI"
import { Navbar } from "./InterfaceElements/Navbar"
import { Reg } from "./reg/Reg"
import Auth from "./auth/Auth"
import MainPage from "./pages/MainPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <>
            <Navbar />
            <Outlet />
        </>,
        children: [
            {
                path: "/reg",
                element: <Reg />
            },
            {
                path: "/auth",
                element: <Auth />
            },
        ]
    }
])

const authRouter = createBrowserRouter([
    {
        path: "/",
        element: <>
            {
                // главная навигация, по вкладкам
            }
            <Navbar />
            <Outlet />
        </>,
        children: [
            // главная с лентой новостей (записей) от друзей
            {
                path: "/main",
                element: <MainPage />
            },
            // аккаунт пользователя
            {
                path: "/:id",
                element: <MainPage />
            },
            // чат с пользователем
            {
                path: "/",
                element: <MainPage />
            },
            // групповой чат
            {
                path: "/",
                element: <MainPage />
            },
            // 
        ]
    }
])

export const App = () => {
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
}