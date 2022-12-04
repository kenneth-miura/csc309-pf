import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorPage from './pages/Error'
import LoginPage from './pages/Login';

import {
    createBrowserRouter,
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
        
    }
]);

export default router;