import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Layouts/Main.jsx';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register';
import AuthProvider from './providers/AuthProvider';
import AllTask from './components/AllTask/AllTask';
import Update from './components/Update/Update';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './route/PrivateRoute';
import AdminRoute from './route/AdminRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';


const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/dashboard',
        element: <AdminRoute><Dashboard></Dashboard></AdminRoute>,
        loader: () => fetch('https://project-task-server.vercel.app/tasks')
      },
      {
        path: '/allTask',
        element: <PrivateRoute><AllTask></AllTask></PrivateRoute>,
        loader: () => fetch('https://project-task-server.vercel.app/tasks')
      },
      {
        path: '/update/:id',
        element: <Update></Update>,
        loader: ({ params }) => fetch(`https://project-task-server.vercel.app/tasks/${params.id}`)
      },
      
    ]
  },
  {
    path: '*',
    element: <NotFoundPage></NotFoundPage>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>
);
