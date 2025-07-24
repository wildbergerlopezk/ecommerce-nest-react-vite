import React from 'react';
import './OrderCard.css'
interface OrderCardProps {
  order: {
    id: string;
    status: string;
    createdAt: string;
    totalAmount: number;
    currency: string;
    orderItems: {
      product: {
        imageUrl: string;
        price: number;
        name: string;
      };
      quantity: number;
      unitPrice: number;
    }[];
  };
  formatDate: (dateString: string) => string;
  getStatusColor: (status: string) => string;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  formatDate,
  getStatusColor,
}) => {
  return (
    <div className="order-card">
      <div className="order-header">
        <h3>Pedido #{order.id}</h3>
        <span
          className="order-status"
          style={{ color: getStatusColor(order.status), fontWeight: 'bold' }}
        >
          {order.status}
        </span>
      </div>
      <p className="order-date">Fecha: {formatDate(order.createdAt)}</p>
      <p className="order-total">
        Total: {order.currency} {order.totalAmount.toLocaleString()}
      </p>
      <div className="order-items">
        {order.orderItems.map((item, index) => (
          <div className="order-item" key={index}>
            <img
              src={item.product.imageUrl}
              alt={item.product.name}
              className="order-item-image"
            />
            <div className="order-item-details">
              <p className="order-item-name">{item.product.name}</p>
              <p className="order-item-quantity">Cantidad: {item.quantity}</p>
              <p className="order-item-price">
                Precio unitario: {order.currency} {item.unitPrice.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
