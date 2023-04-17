import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import './global.d.ts';

import RequireAuth from './Components/RequireAuth/RequireAuth';
import { AuthProvider } from './Contexts/Auth';

import DefaultLayout from './Layout/DefaultLayout';

import App from './App';
import HomePage from './Pages/Home/HomePage';
import ProductPage from './Pages/Products';
import LoginPage from './Pages/Login/LoginPage';

import './assets/styles/main.scss';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const router = createBrowserRouter([
  {
    path: '/home',
    element: (
      <RequireAuth>
        <DefaultLayout>
          <HomePage />
        </DefaultLayout>
      </RequireAuth>
    )
  },

  {
    path: '/products',
    element: (
      <RequireAuth>
        <DefaultLayout>
          <ProductPage />
        </DefaultLayout>
      </RequireAuth>
    )
  },

  {
    path: '/',
    element: <LoginPage />
  }
]);

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  );
}
