"use client"
import { ShoppingBag } from "lucide-react"
import './Cart.css'

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
}

type Props = {
  items: CartItem[]
  onCheckout: () => void
}

export function CartSummary({ items, onCheckout }: Props) {
  const subtotal = items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 50000 ? 0 : 5000
  const total = subtotal + shipping

  return (
    <div className="cart-summary">
      <h2 className="summary-title">Resumen del Pedido</h2>
      
      <div className="summary-details">
        <div className="summary-row">
          <span>Subtotal ({items.length} productos)</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
        
        <div className="summary-row">
          <span>Envío</span>
          <span className={shipping === 0 ? "free-shipping" : ""}>
            {shipping === 0 ? "GRATIS" : `$${shipping.toLocaleString()}`}
          </span>
        </div>
        
        {shipping === 0 && (
          <div className="free-shipping-note">
            ¡Felicitaciones! Tienes envío gratis
          </div>
        )}
        
        <div className="summary-divider"></div>
        
        <div className="summary-row summary-total">
          <span>Total</span>
          <span>${total.toLocaleString()}</span>
        </div>
      </div>
      
      <button className="checkout-btn" onClick={onCheckout}>
        <ShoppingBag size={20} />
        Proceder al Pago
      </button>
      
      <div className="security-badges">
        <div className="security-item">
          <span>🔒 Pago Seguro</span>
        </div>
        <div className="security-item">
          <span>🚚 Envío Rápido</span>
        </div>
        <div className="security-item">
          <span>↩️ Devoluciones</span>
        </div>
      </div>
    </div>
  )
}
