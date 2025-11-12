import React, { useContext } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REG_ROUTE } from "../utils/consts";
import Auth from '../auth/Auth.jsx';
import Chat from '../pages/Chat.jsx';
import MainPage from '../pages/MainPage.jsx';
import { Context } from '../main.jsx';
import Admin from '../pages/Admin.jsx';

function AppRouter() {
    const { user } = useContext(Context)

    const CheckRoleMiddleware = false

    console.log(user);

    return (
        <Routes>
            <Route
                path={LOGIN_ROUTE}
                element={<Auth />}
            />
            <Route
                path={REG_ROUTE}
                element={<Auth />}
            />
            <Route
                path={MAIN_ROUTE + '/:id'}
                element={user.isAuth ? <Chat /> : <Navigate to={LOGIN_ROUTE} />}
            />
            <Route
                path={MAIN_ROUTE}
                element={user.isAuth ? <MainPage /> : <Navigate to={LOGIN_ROUTE} />}
            />
            <Route
                path={ADMIN_ROUTE}
                element={CheckRoleMiddleware ? <Admin /> : <Navigate to={LOGIN_ROUTE} />}
            />
            <Route
                path="*"
                element={<Navigate to={MAIN_ROUTE} />}
            />
        </Routes>
    );
}

export default AppRouter