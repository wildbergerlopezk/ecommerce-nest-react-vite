export interface User {
  id: string; 
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  isActive: boolean;
  avatar: string;
  memberSince: string;
  orders: any[];
  wishlist: any[];
}
