
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import PageHeader from '../components/PageHeader';
import { AdminProductForm } from '../components/AdminProductForm';
import { AdminProductList } from '../components/AdminProductList';
import { AdminProjectForm } from '../components/AdminProjectForm';
import { AdminProjectList } from '../components/AdminProjectList';
import { AdminCoverForm } from '../components/AdminCoverForm';
import { AdminHeroForm } from '../components/AdminHeroForm';
import { AdminVideosForm } from '../components/AdminVideosForm';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [productsRefresh, setProductsRefresh] = useState(0);
  const [projectsRefresh, setProjectsRefresh] = useState(0);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <>
      <PageHeader title="Panel de Administración" subtitle="Gestión de Catálogo y Portada" />
      <div className="container" style={{ padding: '4rem 1rem' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'Oswald', fontSize: '2rem' }}>Bienvenido, Admin</h2>
          <button onClick={handleLogout} className="btn btn-outline" style={{ borderColor: '#ef4444', color: '#ef4444' }}>
            Cerrar Sesión
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', alignItems: 'start' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <AdminHeroForm />
            <AdminVideosForm />
            <AdminProductForm onProductAdded={() => setProductsRefresh(k => k + 1)} />
            <AdminProjectForm onProjectAdded={() => setProjectsRefresh(k => k + 1)} />
            <AdminCoverForm />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <AdminProductList refreshKey={productsRefresh} />
            <AdminProjectList refreshKey={projectsRefresh} />
          </div>

        </div>

      </div>
    </>
  );
};

export default Admin;
