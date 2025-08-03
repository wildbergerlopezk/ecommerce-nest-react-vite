import React, { useEffect, useState } from 'react';
import ProductCard, { type Product } from './ProductCard';
import './css/ProductList.css'
export interface ProductListProps {
  title?: string;
  showFilters?: boolean;
  showSorting?: boolean;
  onViewDetails?: (product: Product) => void;
  columns?: 2 | 3 | 4 | 5;
}

type SortOption = 'name' | 'price-low' | 'price-high' | 'newest';
type FilterOption = 'all' | 'in-stock';

const ProductList: React.FC<ProductListProps> = ({
  title,
  showFilters = false,
  showSorting = false,
  onViewDetails,
  columns = 4,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [, setCart] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        if (!res.ok) throw new Error('Error al cargar productos');
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (e: any) {
        setError(e.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();

    setCart([]);
  }, []);

  const handleAddToCart = async (product: Product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        throw new Error('No se pudo agregar el producto al carrito');
      }


      setCart((prevCart) => {
        const index = prevCart.findIndex(item => item.id === product.id);
        if (index >= 0) {
          return prevCart;
        }
        return [...prevCart, product];
      });

      alert(`Producto "${product.name}" agregado al carrito.`);
    } catch (error) {
      console.error(error);
      alert('Error al agregar producto al carrito');
    }
  };

  const filteredProducts = products.filter(p => {
    if (filterBy === 'in-stock') return p.stock > 0;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  if (loading) {
    return (
      <div className="product-list-container">
        {title && <h2>{title}</h2>}
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list-container">
        {title && <h2>{title}</h2>}
        <p>Error: {error}</p>
      </div>
    );
  }

  if (sortedProducts.length === 0) {
    return (
      <div className="product-list-container">
        {title && <h2>{title}</h2>}
        <p>No hay productos disponibles.</p>
      </div>
    );
  }
  
  return (
    <div className="product-list-container">
      {title && <h2>{title}</h2>}

      {(showFilters || showSorting) && (
        <div className="product-list-controls">
          {showFilters && (
            <select value={filterBy} onChange={e => setFilterBy(e.target.value as FilterOption)}>
              <option value="all">Todos</option>
              <option value="in-stock">En stock</option>
            </select>
          )}

          {showSorting && (
            <select value={sortBy} onChange={e => setSortBy(e.target.value as SortOption)}>
              <option value="name">Nombre A-Z</option>
              <option value="price-low">Precio menor</option>
              <option value="price-high">Precio mayor</option>
              <option value="newest">Más recientes</option>
            </select>
          )}
        </div>
      )}

      <div className={`product-grid columns-${columns}`}>
        {sortedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
