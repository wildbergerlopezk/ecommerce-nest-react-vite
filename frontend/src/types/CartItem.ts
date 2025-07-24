export interface CartItemType {
  id: string; 
  productId: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  imageUrl: string;
}
