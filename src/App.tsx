import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="nosotros" element={<About />} />
        <Route path="servicios" element={<Services />} />
        <Route path="proyectos" element={<Projects />} />
        <Route path="productos" element={<Products />} />
        <Route path="contacto" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;
