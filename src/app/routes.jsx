import React from 'react';
import MainLayout from 'src/layouts/MainLayout';
import LoginPage from 'src/features/authen/login/LoginPage';
import RegisterPage from 'src/features/authen/register/RegisterPage';
import HomePage from 'src/features/home/HomePage';
import NotFoundPage from 'src/layouts/NotFoundPage';
import UserSetting from 'src/features/userSetting/UserSetting';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/channels/:serverId', element: <HomePage /> },
      { path: '/channels/:serverId/:channelId', element: <HomePage /> },
      { path: '404', element: <NotFoundPage /> },
      { path: '*', element: <NotFoundPage /> },
      { path: '/setting', element: <UserSetting /> },
    ],
  },
  {
    path: '/authen',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export default routes;
