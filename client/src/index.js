import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import SignUP from './views/Signup/Signup';
import Login from './views/Login/Login';


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path : "/",
    element : <h1>Home</h1>
  },
  {
    path : "/signup",
    element : < SignUP />
  },
  {
    path : "/login",
    element : < Login />
  },
])

root.render(< RouterProvider router={router} />)


