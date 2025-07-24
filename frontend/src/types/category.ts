export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Subcategory {
  id: string;
  name: string;
  products: Product[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories: Subcategory[];
}
