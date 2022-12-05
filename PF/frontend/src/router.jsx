import React from 'react';
import App from './App';
import ErrorPage from './pages/Error'
import LoginPage from './pages/Login';
import Profile from './pages/Profile'

import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
  } from "react-router-dom";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      errorElement: <ErrorPage/>,
    },
    {
        path: "/login",
        element: <LoginPage></LoginPage>,
    },
    {
      path: "/myaccount",
      element: <Profile></Profile>
  }
]);

export default router;