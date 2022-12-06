import React from 'react';
import App from './App';
import ErrorPage from './pages/Error'
import LoginPage from './pages/Login';
import TestSubPage from './pages/TestSubPage'
import RegisterForm from './pages/Register'


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
      element: <TestSubPage></TestSubPage>
  },
  {
    path: "/register",
    element: <RegisterForm></RegisterForm>
}
]);

export default router;
