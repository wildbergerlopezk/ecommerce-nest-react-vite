import React, { useState } from 'react';
import {  Mail, Phone, MapPin, Clock, Send  } from 'lucide-react';
import './Contact.css';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };


  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <h1 className="contact-title">Contacto</h1>
        </div>

        {/* Main Content */}
        <div className="contact-content">
          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="form-header">
              <h2 className="form-title">Envíanos un mensaje</h2>
              <p className="form-subtitle">
                Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo lo antes posible.
              </p>
            </div>

            <div className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Nombre completo *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Teléfono</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="+595 XXX XXX XXX"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Asunto *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="soporte">Soporte técnico</option>
                    <option value="ventas">Consultas de ventas</option>
                    <option value="producto">Información de producto</option>
                    <option value="devolucion">Devoluciones y garantías</option>
                    <option value="facturacion">Facturación</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Mensaje *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows={6}
                  required
                  placeholder="Describe tu consulta o problema..."
                />
              </div>

              <button type="submit" className="submit-btn" onClick={handleSubmit}>
                <Send size={20} />
                Enviar mensaje
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="contact-info-section">
            <div className="info-card">
              <h3 className="info-title">Información de contacto</h3>
              
              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon">
                    <Mail size={20} />
                  </div>
                  <div className="info-content">
                    <h4>Email</h4>
                    <p>info@elytech.com</p>
                    <p>soporte@elytech.com</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <Phone size={20} />
                  </div>
                  <div className="info-content">
                    <h4>Teléfono</h4>
                    <p>+595 21 123 4567</p>
                    <p>+595 981 123 456</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="info-content">
                    <h4>Dirección</h4>
                    <p>Av. España 123</p>
                    <p>Asunción, Paraguay</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <Clock size={20} />
                  </div>
                  <div className="info-content">
                    <h4>Horarios de atención</h4>
                    <p>Lun - Vie: 8:00 - 18:00</p>
                    <p>Sáb: 9:00 - 13:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="faq-card">
              <h3 className="faq-title">¿Necesitas ayuda rápida?</h3>
              <div className="faq-items">
                <div className="faq-item">
                  <h4>¿Cómo puedo rastrear mi pedido?</h4>
                  <p>Ingresa a tu cuenta y ve a "Mis pedidos" para ver el estado de tu compra.</p>
                </div>
                <div className="faq-item">
                  <h4>¿Cuál es el tiempo de entrega?</h4>
                  <p>Entregas en Asunción: 24-48 horas. Interior del país: 2-5 días hábiles.</p>
                </div>
                <div className="faq-item">
                  <h4>¿Ofrecen garantía?</h4>
                  <p>Sí, todos nuestros productos tienen garantía del fabricante.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;