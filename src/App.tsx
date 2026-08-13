import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layouts/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';

const Home = React.lazy(() => import('./components/Home'));
const About = React.lazy(() => import('./components/About'));
const Services = React.lazy(() => import('./components/Services'));
const Projects = React.lazy(() => import('./components/Projects'));
const Products = React.lazy(() => import('./components/Products'));
const Contact = React.lazy(() => import('./components/Contact'));
const Login = React.lazy(() => import('./pages/Login'));
const Admin = React.lazy(() => import('./components/Admin'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "nosotros", element: <About /> },
      { path: "servicios", element: <Services /> },
      { path: "proyectos", element: <Projects /> },
      { path: "productos", element: <Products /> },
      { path: "contacto", element: <Contact /> },
      { path: "login", element: <Login /> },
      { 
        path: "admin", 
        element: (
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        )
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
