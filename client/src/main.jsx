import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter,
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import UserStore from './store/UserStore';
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REG_ROUTE } from "./utils/consts";
import Auth from './pages/Auth.jsx';
import Chat from './pages/Chat.jsx';
import MainPage from './pages/MainPage.jsx';
import Admin from './pages/Admin.jsx';
import AppRouter from './components/Router.jsx';
import { App } from './App.jsx';

export const Context = createContext(null)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Context.Provider value={{
    user: new UserStore()
  }}>
    <App />
  </Context.Provider>
)