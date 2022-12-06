import React from 'react';
import App from './App';
import ErrorPage from './pages/Error'
import LoginPage from './pages/Login';
import Profile from './pages/Profile'
import EditProfilePage from './pages/EditProfile';
import EditAvatarPage from './pages/EditAvatar';

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
    },
    {
      path: "/myaccount/edit",
      element: <EditProfilePage></EditProfilePage>
    },
    {
      path: "/myaccount/avatar",
      element: <EditAvatarPage></EditAvatarPage>
    }
]);

export default router;