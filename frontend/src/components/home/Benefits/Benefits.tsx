import React from 'react';
import { Shield, Zap, HeadphonesIcon, CreditCard, Truck, Award } from 'lucide-react';
import './Benefits.css';

interface Benefit {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const Benefits: React.FC = () => {
  const benefits: Benefit[] = [
    {
      id: 'authentic',
      icon: <Shield size={48} />,
      title: 'Licencias 100% originales',
      description: 'Garantizamos la autenticidad de todo nuestro software con certificados oficiales',
      color: '#10b981'
    },
    {
      id: 'fast-delivery',
      icon: <Zap size={48} />,
      title: 'Envío inmediato',
      description: 'Recibí tus productos digitales al instante y hardware en 24-48 horas',
      color: '#f59e0b'
    },
    {
      id: 'support',
      icon: <HeadphonesIcon size={48} />,
      title: 'Soporte técnico gratuito',
      description: 'Nuestro equipo te ayuda con instalación y configuración sin costo adicional',
      color: '#3b82f6'
    },
    {
      id: 'payment',
      icon: <CreditCard size={48} />,
      title: 'Múltiples medios de pago',
      description: 'Tarjetas, transferencias, PayPal, criptomonedas y más opciones disponibles',
      color: '#8b5cf6'
    },
    {
      id: 'warranty',
      icon: <Award size={48} />,
      title: 'Garantía extendida',
      description: 'Todos nuestros productos incluyen garantía oficial del fabricante',
      color: '#ef4444'
    },
    {
      id: 'shipping',
      icon: <Truck size={48} />,
      title: 'Envío gratuito',
      description: 'Envío gratis en compras mayores a $100. Entrega segura y rastreable',
      color: '#06b6d4'
    }
  ];

  return (
    <section className="benefits-section">
      <div className="benefits-container">
        <div className="benefits-header">
          <h2 className="benefits-title">¿Por qué elegir Elytech?</h2>
          <p className="benefits-subtitle">
            Ofrecemos la mejor experiencia de compra con servicios que marcan la diferencia
          </p>
        </div>
        
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.id} 
              className="benefit-card"
              style={{ 
                '--benefit-color': benefit.color,
                '--animation-delay': `${index * 0.1}s`
              } as React.CSSProperties}
            >
              <div className="benefit-icon">
                {benefit.icon}
              </div>
              <div className="benefit-content">
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
              <div className="benefit-glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;