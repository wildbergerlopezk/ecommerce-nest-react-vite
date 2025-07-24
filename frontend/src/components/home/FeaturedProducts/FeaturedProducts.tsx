import React, { useState } from 'react';
import { Star, ShoppingCart, Eye, Heart, ArrowLeft, ArrowRight } from 'lucide-react';
import './FeaturedProducts.css';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  discount?: number;
  featured?: boolean;
  stock: number;
}

interface FeaturedProductsProps {
  onProductClick?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  onProductClick, 
  onAddToCart 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const products: Product[] = [
    {
      id: 'iphone-13',
      name: 'iPhone 13 128GB',
      description: 'Smartphone Apple con chip A15 Bionic',
      price: 899,
      originalPrice: 999,
      rating: 4.8,
      reviewCount: 2847,
      image: 'https://cellshop.com.py/media/catalog/product/4/7/4767763_1_2bf2_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=616&width=616&canvas=616:616',
      category: 'Smartphones',
      discount: 10,
      featured: true,
      stock: 15
    },
    {
      id: 'ryzen-7',
      name: 'AMD Ryzen 7 5800X',
      description: 'Procesador de 8 núcleos para gaming',
      price: 329,
      originalPrice: 399,
      rating: 4.9,
      reviewCount: 1456,
      image: 'https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2505503-ryzen-7-5800x.jpg',
      category: 'Componentes',
      discount: 18,
      featured: true,
      stock: 8
    },
    {
      id: 'office-365',
      name: 'Microsoft Office 365',
      description: 'Licencia original para 1 usuario',
      price: 69,
      originalPrice: 99,
      rating: 4.7,
      reviewCount: 3294,
      image: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=400',
      category: 'Software',
      discount: 30,
      featured: true,
      stock: 50
    },
    {
      id: 'gaming-laptop',
      name: 'ASUS ROG Strix G15',
      description: 'Laptop gaming con RTX 3060 y Ryzen 7',
      price: 1299,
      originalPrice: 1499,
      rating: 4.6,
      reviewCount: 892,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
      category: 'Computadoras',
      discount: 13,
      featured: true,
      stock: 3
    },
    {
      id: 'mechanical-keyboard',
      name: 'Logitech MX Keys',
      description: 'Teclado mecánico inalámbrico',
      price: 99,
      originalPrice: 129,
      rating: 4.5,
      reviewCount: 2156,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
      category: 'Periféricos',
      discount: 23,
      featured: true,
      stock: 12
    },
    {
      id: 'rtx-4070',
      name: 'NVIDIA RTX 4070',
      description: 'Tarjeta gráfica para gaming 4K',
      price: 599,
      originalPrice: 699,
      rating: 4.8,
      reviewCount: 764,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
      category: 'Componentes',
      discount: 14,
      featured: true,
      stock: 6
    }
  ];

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(products.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentProducts = () => {
    const start = currentSlide * itemsPerSlide;
    return products.slice(start, start + itemsPerSlide);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={`star ${i < Math.floor(rating) ? 'filled' : 'empty'}`}
      />
    ));
  };

  return (
    <section className="featured-products-section">
      <div className="featured-products-container">
        <div className="featured-header">
          <h2 className="featured-title">Productos destacados</h2>
          <p className="featured-subtitle">
            Los mejores productos con descuentos especiales y calidad garantizada
          </p>
        </div>

        <div className="featured-carousel">
          <button 
            className="carousel-btn prev-btn"
            onClick={prevSlide}
            disabled={currentSlide === 0}
          >
            <ArrowLeft size={20} />
          </button>

          <div className="products-grid">
            {getCurrentProducts().map((product) => (
              <div key={product.id} className="product-card">
                {product.discount && (
                  <div className="product-badge">
                    -{product.discount}%
                  </div>
                )}
                
                <div className="product-image-wrapper">
                    <img className="product-image" src={product.image} alt={product.name} />
                    <div className="product-overlay">
                        <button 
                        className="overlay-btn"
                        onClick={() => onProductClick?.(product.id)}
                        >
                        <Eye size={16} />
                        </button>
                        <button className="overlay-btn wishlist-btn">
                        <Heart size={16} />
                        </button>
                    </div>
                </div>


                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  
                  <div className="product-rating">
                    <div className="stars">
                      {renderStars(product.rating)}
                    </div>
                    <span className="rating-text">
                      {product.rating} ({product.reviewCount} reseñas)
                    </span>
                  </div>

                  <div className="product-price">
                    <span className="price-current">${product.price}</span>
                    {product.originalPrice && (
                      <span className="price-original">${product.originalPrice}</span>
                    )}
                  </div>

                  <div className="product-stock">
                    <span className={`stock-indicator ${product.stock < 5 ? 'low' : 'normal'}`}>
                      {product.stock < 5 ? `¡Solo ${product.stock} disponibles!` : 'En stock'}
                    </span>
                  </div>

                  <button 
                    className="add-to-cart-btn"
                    onClick={() => onAddToCart?.(product.id)}
                  >
                    <ShoppingCart size={16} />
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button 
            className="carousel-btn next-btn"
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
          >
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="carousel-indicators">
          {Array.from({ length: totalSlides }, (_, i) => (
            <button
              key={i}
              className={`indicator ${i === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;