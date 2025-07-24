"use client"
import { Trash2, Plus, Minus } from "lucide-react"
import './Cart.css'
import type { CartItemType } from "../../types/CartItem"

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (id: string, newQuantity: number) => void
  onRemove: (id: string) => void
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    onUpdateQuantity(item.id, newQuantity)
  }

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.imageUrl} alt={item.name} />
      </div>
      
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-description">{item.description}</p>
        <div className="cart-item-price">
          <span className="price-current">${item.price.toLocaleString()}</span>
          {item.originalPrice && (
            <span className="price-original">${item.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>

      <div className="cart-item-controls">
        <div className="quantity-controls">
          <button 
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity - 1)}
          >
            <Minus size={16} />
          </button>
          <span className="quantity-display">{item.quantity}</span>
          <button 
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            <Plus size={16} />
          </button>
        </div>
        
        <div className="cart-item-total">
          ${(item.price * item.quantity).toLocaleString()}
        </div>
        
        <button 
          className="remove-btn"
          onClick={() => onRemove(item.id)}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}