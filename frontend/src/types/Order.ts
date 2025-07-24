export interface OrderItem {
  product: {
    name: string;
    image: string;
    price: number;  
  };
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  status: string;
  createdAt: string;
  totalAmount: number;
  currency: string;
  orderItems: {
    product: {
      name: string;
      imageUrl: string;
      price: number;
    };
    quantity: number;
    unitPrice: number;
  }[];
}
