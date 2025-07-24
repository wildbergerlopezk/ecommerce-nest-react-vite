import './UserHeader.css';
import { LogOut } from 'lucide-react';
import { type User } from '../../../types/User';

interface UserHeaderProps {
  user: User;
  onLogout: () => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({ user, onLogout }) => (
  <div className="user-header">
    <div className="user-info">
      <h1 className="user-name">{user.name}</h1>
      <p className="user-email">{user.email}</p>
    </div>
    <button className="logout-btn" onClick={onLogout}>
      <LogOut size={20} />
      Cerrar Sesión
    </button>
  </div>
);

export default UserHeader;
