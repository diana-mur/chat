import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import UserStore from './store/UserStore';
import { App } from './App.jsx';

export const Context = createContext(null)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Context.Provider value={{
    user: new UserStore()
  }}>
    <App />
  </Context.Provider>
)