import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './SuccesPage.css';

export function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      console.log('Pago exitoso, session_id:', sessionId);
    }
  }, [sessionId]);

  return (
    <div className="success-page">
      <div className="success-background">
        <div className="success-overlay"></div>
      </div>
      
      <div className="success-content">
        <div className="success-container">
          <div className="success-icon">
            <div className="success-checkmark">
              <div className="success-checkmark-circle"></div>
              <div className="success-checkmark-stem"></div>
              <div className="success-checkmark-kick"></div>
            </div>
          </div>
          
          <div className="success-text">
            <h1 className="success-title">
              ¡Pago realizado con éxito!
            </h1>
            
            <p className="success-subtitle">
              Gracias por tu compra. Recibirás un correo de confirmación en breve.
            </p>
            
            {sessionId && (
              <div className="success-details">
                <p className="success-session">
                  <span className="success-session-label">ID de sesión:</span>
                  <span className="success-session-id">{sessionId}</span>
                </p>
              </div>
            )}
            
            <div className="success-actions">
              <Link to="/" className="success-btn success-btn-primary">
                <span className="success-btn-icon">🏠</span>
                Volver al inicio
              </Link>
              
              <Link to="/me" className="success-btn success-btn-secondary">
                <span className="success-btn-icon">📋</span>
                Ver mis pedidos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}