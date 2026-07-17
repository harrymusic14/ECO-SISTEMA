
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { ProtectedRoute } from './components/ProtectedRoute';

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
