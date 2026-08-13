import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('./layouts/Layout.tsx', [
    index('./components/Home/index.tsx'),
    route('nosotros', './components/About/index.tsx'),
    route('servicios', './components/Services/index.tsx'),
    route('proyectos', './components/Projects/index.tsx'),
    route('productos', './components/Products/index.tsx'),
    route('contacto', './components/Contact/index.tsx'),
    route('login', './pages/Login.tsx'),
    route('admin', './routes/admin.tsx'),
  ]),
] satisfies RouteConfig;
