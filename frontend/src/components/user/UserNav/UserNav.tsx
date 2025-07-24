import { User, Package,  Settings } from 'lucide-react';

interface UserNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const UserNav: React.FC<UserNavProps> = ({ activeTab, setActiveTab }) => (
  <div className="user-nav">
    <button 
      className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
      onClick={() => setActiveTab('profile')}
    >
      <User size={20} />
      Perfil
    </button>
    <button 
      className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
      onClick={() => setActiveTab('orders')}
    >
      <Package size={20} />
      Pedidos
    </button>
    <button 
      className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
      onClick={() => setActiveTab('settings')}
    >
      <Settings size={20} />
      Configuración
    </button>
  </div>
);

export default UserNav;