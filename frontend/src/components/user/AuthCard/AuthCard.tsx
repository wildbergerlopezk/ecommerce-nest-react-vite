import { User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthCardProps {
  onLogin: () => void;
}

const AuthCard: React.FC<AuthCardProps> = ({ onLogin }) => (
  <div className="auth-container">
    <div className="auth-card">
      <div className="auth-header">
        <div className="auth-icon">
          <User size={48} />
        </div>
        <h2 className="auth-title">Accede a tu cuenta</h2>
        <p className="auth-subtitle">
          Inicia sesión para ver tu perfil, pedidos y lista de deseos
        </p>
      </div>
      <div className="auth-actions">
        <Link to="/login" className="auth-btn primary" onClick={onLogin}>
          Iniciar Sesión
        </Link>
        <Link to="/register" className="auth-btn secondary">
          Registrarse
        </Link>
      </div>
    </div>
  </div>
);

export default AuthCard;