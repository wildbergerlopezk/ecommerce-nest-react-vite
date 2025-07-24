"use client"

import { useState } from "react"
import {  ShoppingCart, User, Menu } from "lucide-react"
import './Header.css'
import { Link } from 'react-router-dom'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <div className="logo-icon">
            <img
              src="https://i.ibb.co/twVy6s93/Elytech-Blanco-Recortado.png"
              alt="Elytech-Blanco-Sin-Fondo"
            />
          </div>
        </div>

        <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/products" className="nav-link">Productos</Link>
          <Link to="/categories" className="nav-link">Categorías</Link>
          <Link to="/ofertas" className="nav-link">Ofertas</Link>
          <Link to="/contacto" className="nav-link">Contacto</Link>
        </nav>

        <div className="header-actions">
          

          <div className="header-icons">
            <Link to="/cart" className="icon-btn cart-btn">
              <ShoppingCart size={30} />
              <span className="cart-count">0</span>
            </Link>
            <Link to="/me" className="icon-btn">
                <User size={30} />
              </Link>
          </div>
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  )
}
