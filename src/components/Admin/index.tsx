
import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import PageHeader from '../PageHeader';
import { AdminProductForm } from './components/AdminProductForm';
import { AdminProductList } from './components/AdminProductList';
import { useNavigate } from 'react-router';

const Admin = () => {
  const navigate = useNavigate();
  const [productsRefresh, setProductsRefresh] = useState(0);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <>
      <PageHeader title="Panel de Administración" subtitle="Gestión de Catálogo" />
      <div className="container" style={{ padding: '4rem 1rem' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'Oswald', fontSize: '2rem' }}>Bienvenido, Admin</h2>
          <button onClick={handleLogout} className="btn btn-outline" style={{ borderColor: '#ef4444', color: '#ef4444' }}>
            Cerrar Sesión
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', alignItems: 'start' }}>

          <AdminProductForm onProductAdded={() => setProductsRefresh(k => k + 1)} />

          <AdminProductList refreshKey={productsRefresh} />

        </div>

      </div>
    </>
  );
};

export default Admin;
