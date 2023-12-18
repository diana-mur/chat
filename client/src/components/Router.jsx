import React, { createContext, useContext } from 'react';
import { Navigate, Route, Routes, createBrowserRouter } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REG_ROUTE } from "../utils/consts";
import Auth from '../pages/Auth.jsx';
import Chat from '../pages/Chat.jsx';
import MainPage from '../pages/MainPage.jsx';
import { Context } from '../main.jsx';
import Admin from '../pages/Admin.jsx';

function AppRouter() {
    const { user } = useContext(Context)

    const CheckRoleMiddleware = false

    // const router = createBrowserRouter([
    //     {
    //         path: LOGIN_ROUTE,
    //         element: <Auth />,
    //     },
    //     {
    //         path: REG_ROUTE,
    //         element: <Auth />,
    //     },
    //     {
    //         path: MAIN_ROUTE + '/:id',
    //         element: user.isAuth ? <Chat /> : <Navigate to={LOGIN_ROUTE} />,
    //     },
    //     {
    //         path: MAIN_ROUTE,
    //         element: user.isAuth ? <MainPage /> : <Navigate to={LOGIN_ROUTE} />,
    //     },
    //     {
    //         path: ADMIN_ROUTE,
    //         element: CheckRoleMiddleware ? <Admin /> : <Navigate to={LOGIN_ROUTE} />,
    //     },
    //     {
    //         path: '*',
    //         element: <Navigate to={LOGIN_ROUTE} />,
    //     },
    // ]);

    console.log(user);

    return (
        <Routes>
            <Route
                path={LOGIN_ROUTE}
                element={<Auth />}
            />
            <Route
                path={REG_ROUTE}
                element={<Auth />} />
            <Route
                path={MAIN_ROUTE + '/:id'}
                element={user.isAuth ? <Chat /> : <Navigate to="/login" />}
                // element={<Chat />}
            />
            <Route
                path={MAIN_ROUTE}
                element={user.isAuth ? <MainPage /> : <Navigate to="/login" />}
                // element={<MainPage />}
            />
            <Route
                path={ADMIN_ROUTE}
                element={CheckRoleMiddleware ? <Admin /> : <Navigate to={LOGIN_ROUTE} />}
                // element={<Admin />}
            />
            <Route
                path="*"
                element={<Navigate to="/login" />}
            />

        </Routes>
    );
}

export default AppRouter