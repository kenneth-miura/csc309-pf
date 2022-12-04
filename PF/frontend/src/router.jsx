import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorPage from './pages/Error'
import LoginPage from './pages/Login';
import TextSubPage from './pages/TestSubPage'

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
      path: "/login/studio",
      element: <TextSubPage></TextSubPage>
  }
]);

export default router;