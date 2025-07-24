export interface Product {
  id: string;
  name: string;
  price: number;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface User {
  id: string;
  email: string;
  token?: string;
}
