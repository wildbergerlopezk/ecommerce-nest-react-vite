import React from 'react';
import './OrdersTab.css';
import { OrderCard } from '../OrderCard/OrderCard';
import { type Order } from '../../../types/Order';

interface OrdersTabProps {
  orders: Order[] | undefined;
}

const OrdersTab: React.FC<OrdersTabProps> = ({ orders }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'entregado':
        return 'green';
      case 'pendiente':
        return 'orange';
      case 'cancelado':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <div className="orders-tab">
      <h2>Mis Pedidos</h2>
      {Array.isArray(orders) && orders.length > 0 ? (
        <div className="orders-grid">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              formatDate={formatDate}
              getStatusColor={getStatusColor}
            />
          ))}
        </div>
      ) : (
        <p className="no-orders">Aún no tienes pedidos realizados.</p>
      )}
    </div>
  );
};

export default OrdersTab;
