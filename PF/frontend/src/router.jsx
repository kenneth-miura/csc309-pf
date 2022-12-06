import React from 'react';
import App from './App';
import ErrorPage from './pages/Error'
import LoginPage from './pages/Login';
import TestSubPage from './pages/TestSubPage'
import ClassScheduler from './pages/ClassScheduler';

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
      path: "/classes",
      element: <ClassScheduler></ClassScheduler>
    }
]);

export default router;
