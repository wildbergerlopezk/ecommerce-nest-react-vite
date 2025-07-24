import { Link } from 'react-router-dom';
import './CancelPage.css';

export function Cancel() {
  return (
    <div className="cancel-page">
      <div className="cancel-background">
        <div className="cancel-overlay"></div>
      </div>
      
      <div className="cancel-content">
        <div className="cancel-container">
          <div className="cancel-icon">
            <div className="cancel-x-mark">
              <div className="cancel-x-circle"></div>
              <div className="cancel-x-line1"></div>
              <div className="cancel-x-line2"></div>
            </div>
          </div>
          
          <div className="cancel-text">
            <h1 className="cancel-title">
              Pago cancelado
            </h1>
            
            <p className="cancel-subtitle">
              No se ha completado el pago. Podés intentarlo de nuevo en cualquier momento.
            </p>
            
            <div className="cancel-reasons">
              <h3 className="cancel-reasons-title">¿Por qué puede haberse cancelado?</h3>
              <ul className="cancel-reasons-list">
                <li>Cancelaste el proceso de pago</li>
                <li>Hubo un problema con tu método de pago</li>
                <li>La sesión expiró por inactividad</li>
              </ul>
            </div>
            
            <div className="cancel-actions">
              <Link to="/products" className="cancel-btn cancel-btn-primary">
                <span className="cancel-btn-icon">🔄</span>
                Intentar de nuevo
              </Link>
              
              <Link to="/" className="cancel-btn cancel-btn-secondary">
                <span className="cancel-btn-icon">🏠</span>
                Volver al inicio
              </Link>
              
              <Link to="/cart" className="cancel-btn cancel-btn-tertiary">
                <span className="cancel-btn-icon">🛒</span>
                Ver carrito
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}