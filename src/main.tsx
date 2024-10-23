import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux'
import store from './redux/store';
import UserProvider from './provider/Provider';
import MainLayout from './layout/main/MainLayout';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import ProcatedRoute from './utils/ProcatedRoute';
import { Toaster } from 'sonner';
import CreateProject from './pages/CreateProject/CreateProject';
import CreateBlogs from './pages/CreateBlogs/CreateBlogs';
import CreateSkill from './pages/createSkill/CreateSkill';
import Project from './pages/project/Project';
import Blog from './pages/Blog/Blog';
import Skill from './pages/Skill/Skill';

const router = createBrowserRouter([
  {
    path: '/signin',
    element: <Login />
  },
  {
    path: "/",
    element: <ProcatedRoute><MainLayout /></ProcatedRoute>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: "/create-project",
        element: <CreateProject />
      },
      {
        path: '/create-blogs',
        element: <CreateBlogs />
      },
      {
        path: '/create-skill',
        element: <CreateSkill />
      },
      {
        path: '/project',
        element: <Project />
      },
      {
        path: '/blogs',
        element: <Blog />
      },
      {
        path: '/skill',
        element: <Skill />
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <Toaster />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </UserProvider>
  </StrictMode>,
)
