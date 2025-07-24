import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, Send } from "lucide-react" 
import './Footer.css'
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon">
              <img
                src="https://i.ibb.co/twVy6s93/Elytech-Blanco-Recortado.png"
                alt="Elytech-Blanco-Sin-Fondo"
              />
              </div>
              
            </div>
            <p className="footer-description">
              Tu tienda de tecnología de confianza. Productos de calidad, precios competitivos y el mejor servicio al
              cliente.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <Facebook size={24} />
              </a>
              <a href="#" className="social-link">
                <Instagram size={24} />
              </a>
              <a href="#" className="social-link">
                <Twitter size={24} />
              </a>
              <a href="#" className="social-link">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Productos</h3>
            <ul className="footer-links">
              <li>
                <a href="/laptops">Laptops</a>
              </li>
              <li>
                <a href="/smartphones">Smartphones</a>
              </li>
              <li>
                <a href="/tablets">Tablets</a>
              </li>
              <li>
                <a href="/accesorios">Accesorios</a>
              </li>
              <li>
                <a href="/gaming">Gaming</a>
              </li>
              <li>
                <a href="/componentes">Componentes</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Atención al Cliente</h3>
            <ul className="footer-links">
              <li>
                <a href="/contacto">Contacto</a>
              </li>
              <li>
                <a href="/soporte">Soporte Técnico</a>
              </li>
              <li>
                <a href="/garantias">Garantías</a>
              </li>
              <li>
                <a href="/devoluciones">Devoluciones</a>
              </li>
              <li>
                <a href="/envios">Envíos</a>
              </li>
              <li>
                <a href="/faq">Preguntas Frecuentes</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Empresa</h3>
            <ul className="footer-links">
              <li>
                <a href="/sobre-nosotros">Sobre Nosotros</a>
              </li>
              <li>
                <a href="/sucursales">Sucursales</a>
              </li>
              <li>
                <a href="/trabajar">Trabajar con Nosotros</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
              <li>
                <a href="/noticias">Noticias</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Newsletter</h3>
            <p className="newsletter-text">Suscríbete y recibe las mejores ofertas y novedades en tecnología.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Tu email" className="newsletter-input" required />
              <button type="submit" className="newsletter-btn">
                <Send size={20} />
              </button>
            </form>
            <div className="contact-info">
              <p className="contact-item">
                <Mail size={16} /> info@elytech.com
              </p>
              <p className="contact-item">
                <Phone size={16} /> +595 21 123 4567
              </p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">© 2024 ElyTech. Todos los derechos reservados.</p>
            <div className="footer-bottom-links">
              <a href="/terminos">Términos y Condiciones</a>
              <a href="/privacidad">Política de Privacidad</a>
              <a href="/cookies">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
