import React, { useEffect, useState } from 'react';
import './css/ProductCard.css';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  stock: number;
  slug: string;
  subcategory: {
    name: string;
  };
  quantity?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  showQuickActions?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  showQuickActions = true,
}) => {
  const [hasToken, setHasToken] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setHasToken(!!token);
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasToken) {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      return;
    }
    if (onAddToCart && product.stock > 0) {
      onAddToCart(product);
    }
  };

  const handleViewDetails = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (onViewDetails) {
      onViewDetails(product);
    } else {
      setShowDetails(true);
    }
  };

  const closeModal = () => setShowDetails(false);

  return (
    <>
      <div className="product-card" onClick={handleViewDetails}>
        <div className="product-image-container">
          <div className="image-wrapper">
            <img
              src={product.imageUrl || '/placeholder.png'}
              alt={product.name}
              className="product-image"
            />
          </div>

          {product.stock <= 0 && (
            <div className="product-out-of-stock">
              <span>Agotado</span>
            </div>
          )}

          {showQuickActions && (
            <div className="product-actions">
              <button
                className="action-btn view-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewDetails(e);
                }}
                title="Ver detalles"
              >
                <span className="material-symbols-outlined">visibility</span>
              </button>
              <button
                className={`action-btn view-btn ${product.stock <= 0 || !hasToken ? 'disabled' : ''}`}
                onClick={handleAddToCart}
                disabled={product.stock <= 0 || !hasToken}
                title={
                  !hasToken
                    ? 'Inicia sesión'
                    : product.stock > 0
                    ? 'Agregar al carrito'
                    : 'Producto agotado'
                }
              >
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
            </div>
          )}
        </div>

        <div className="product-info">
          <div className="product-category">{product.subcategory.name}</div>
          <h3 className="product-name">{product.name}</h3>
          {product.description && (
            <p className="product-description">{product.description}</p>
          )}

          <div className="product-price">
            <span className="price-current">${product.price.toFixed(2)}</span>
          </div>

          <button
            className={`add-to-cart-btn ${product.stock <= 0 || !hasToken ? 'disabled' : ''}`}
            onClick={handleAddToCart}
            disabled={product.stock <= 0 || !hasToken}
          >
            {product.stock <= 0
              ? 'Producto agotado'
              : !hasToken
              ? 'Inicia sesión'
              : 'Agregar al carrito'}
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              &times;
            </button>
            <h2>{product.name}</h2>
            <img
              src={product.imageUrl || '/placeholder.png'}
              alt={product.name}
              style={{ maxWidth: '100%', maxHeight: 200, marginBottom: 16 }}
            />
            <p><strong>Categoría:</strong> {product.subcategory.name}</p>
            <p><strong>Descripción:</strong> {product.description || 'No disponible'}</p>
            <p><strong>Precio:</strong> ${product.price.toFixed(2)}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
