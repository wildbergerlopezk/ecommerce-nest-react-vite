import React, { useState, useEffect } from 'react';
import { User as UserIcon, ShoppingBag, Settings, LogOut } from 'lucide-react';
import SettingsTab from './SettingsTab/SettingsTab';
import { type User } from '../../types/User';
import './UserPage.css';
import ProfileTab from './ProfileTab/ProfileTab';
import OrdersTab from './OrdersTab/OrdersTab';

const TABS = {
  PROFILE: 'profile',
  ORDERS: 'orders',
  SETTINGS: 'settings',
};

const UserPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(TABS.PROFILE);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      window.location.href = '/login';
      return;
    }

    try {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
      console.log('User cargado:', parsedUser);

      const apiUrl = import.meta.env.VITE_API_URL;

      fetch(`${apiUrl}/orders?userId=${parsedUser.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setOrders(data);
          console.log('Pedidos cargados:', data);
        })
        .catch((error) => {
          console.error('Error cargando pedidos:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.error('Error parseando usuario:', err);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }, []);

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className="user-page">
      <aside className="user-sidebar">
        <div className="user-info">
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
        </div>
        <nav className="user-nav">
          <button onClick={() => setActiveTab(TABS.PROFILE)}>
            <UserIcon size={20} /> Perfil
          </button>
          <button onClick={() => setActiveTab(TABS.ORDERS)}>
            <ShoppingBag size={20} /> Pedidos
          </button>
          <button onClick={() => setActiveTab(TABS.SETTINGS)}>
            <Settings size={20} /> Configuración
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
          >
            <LogOut size={20} /> Cerrar sesión
          </button>
        </nav>
      </aside>

      <main className="user-main">
        {activeTab === TABS.PROFILE && user && <ProfileTab user={user} setUser={setUser} />}
        {activeTab === TABS.ORDERS && <OrdersTab orders={orders} />}
        {activeTab === TABS.SETTINGS && <SettingsTab />}
      </main>
    </div>
  );
};

export default UserPage;
