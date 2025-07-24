"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartSummary } from "./CartSummary";
import { CartItem } from "./CartItem";
import type { CartItemType } from "../../types/CartItem";

const API_URL = import.meta.env.VITE_API_URL as string;

export function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar carrito");
        return res.json();
      })
      .then((data) => {
        const formatted = data.map((item: any) => ({
          id: item.id,
          productId: item.productId,
          name: item.product.name,
          description: item.product.description,
          price: item.product.price,
          originalPrice: item.product.originalPrice,
          quantity: item.quantity,
          imageUrl: item.product.imageUrl,
        }));
        setCartItems(formatted);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    fetch(`${API_URL}/cart/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity: newQuantity }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al actualizar cantidad");
        setCartItems((items) =>
          items.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          )
        );
      })
      .catch(console.error);
  };

  const removeItem = (id: string) => {
    fetch(`${API_URL}/cart/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al eliminar ítem");
        setCartItems((items) => items.filter((item) => item.id !== id));
      })
      .catch(console.error);
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const orderRes = await fetch(`${API_URL}/orders/create-from-cart`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!orderRes.ok) throw new Error("No se pudo crear la orden");

      const order = await orderRes.json();

      const paymentRes = await fetch(`${API_URL}/payments/checkout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.id,
          amount: order.totalAmount,
        }),
      });

      if (!paymentRes.ok) throw new Error("Error al iniciar sesión de pago");

      const { url } = await paymentRes.json();

      window.location.href = url;

    } catch (error) {
      console.error("Error en el checkout:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueShopping = () => {
    navigate("/products"); 
  };

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Cargando tu carrito...</p>
    </div>
  );

  if (cartItems.length === 0)
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </div>
            <h3>Tu carrito está vacío</h3>
            <p>¡Explora nuestros productos y encuentra algo especial!</p>
            <button 
              className="continue-shopping-btn"
              onClick={handleContinueShopping}
            >
              Continuar Comprando
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="cart-page">
      <div className="cart-container">
        <button 
          className="continue-shopping-btn"
          onClick={handleContinueShopping}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Continuar Comprando
        </button>

        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        <CartSummary items={cartItems} onCheckout={handleCheckout} />
      </div>
    </div>
  );
}