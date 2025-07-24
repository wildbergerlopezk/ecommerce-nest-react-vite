import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Grid, List, Filter, Search } from 'lucide-react';
import ProductCard, { type Product as ProductType } from '../product/ProductCard';
import './CategoryPage.css';

interface Subcategory {
  id: string;
  name: string;
  slug: string;
  products: ProductType[];
}

interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
  subcategories: Subcategory[];
}

interface CategoryPageProps {
  apiBaseUrl?: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({
  apiBaseUrl = 'http://localhost:3000',
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    if (slug) fetchCategory(slug);
  }, [slug]);

  const fetchCategory = async (categorySlug: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${apiBaseUrl}/categories/slug/${categorySlug}`);
      if (!res.ok) throw new Error('Categoría no encontrada');
      const data = await res.json();
      setCategory(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar la categoría');
      setCategory(null);
    } finally {
      setLoading(false);
    }
  };

  const getAllProducts = (): ProductType[] => {
    if (!category) return [];
    return category.subcategories.flatMap((sub) =>
      sub.products.map((p) => ({
        ...p,
        subcategory: { name: sub.name },
      }))
    );
  };

  const getFilteredProducts = (): ProductType[] => {
    let products = getAllProducts();

    if (selectedSubcategory) {
      const sub = category?.subcategories.find((s) => s.id === selectedSubcategory);
      products = sub
        ? sub.products.map((p) => ({ ...p, subcategory: { name: sub.name } }))
        : [];
    }

    if (searchTerm) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return products;
  };

  const handleViewDetails = (product: ProductType) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = async (product: ProductType) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Debes iniciar sesión para agregar productos al carrito.');
        return;
      }

      const response = await fetch(`${apiBaseUrl}/cart`, {
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

      if (!response.ok) {
        throw new Error('Error al agregar producto al carrito');
      }

      const data = await response.json();
      console.log('Carrito actualizado en backend:', data);
      alert(`Producto "${product.name}" agregado al carrito.`);
    } catch (error) {
      console.error(error);
      alert('No se pudo agregar el producto al carrito');
    }
  };

  const handleSubcategoryClick = (id: string) => {
    setSelectedSubcategory((prev) => (prev === id ? null : id));
  };

  const closeProductModal = () => setSelectedProduct(null);

  const filteredProducts = getFilteredProducts();

  if (loading) {
    return (
      <div className="category-page">
        <div className="category-loading">
          <div className="loading-spinner" />
          <p>Cargando categoría...</p>
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="category-page">
        <div className="category-error">
          <h2>Error</h2>
          <p>{error || 'Categoría no encontrada'}</p>
          <button className="error-btn" onClick={() => navigate('/categories')}>
            Volver a Categorías
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="category-header">
        <div className="category-header-content">
          <div className="breadcrumb">
            <span onClick={() => navigate('/')} className="breadcrumb-link">
              Inicio
            </span>
            <ChevronRight size={16} />
            <span onClick={() => navigate('/categories')} className="breadcrumb-link">
              Categorías
            </span>
            <ChevronRight size={16} />
            <span className="breadcrumb-current">{category.name}</span>
          </div>
          <h1 className="category-title">{category.name}</h1>
          {category.description && <p className="category-description">{category.description}</p>}
        </div>
      </div>

      <div className="category-content">
        <div className="category-filters">
          <div className="filters-row">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="view-controls">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={20} />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {category.subcategories.length > 0 && (
            <div className="subcategory-filters">
              <button
                className={`subcategory-btn ${!selectedSubcategory ? 'active' : ''}`}
                onClick={() => setSelectedSubcategory(null)}
              >
                Todas ({getAllProducts().length})
              </button>
              {category.subcategories.map((sub) => (
                <button
                  key={sub.id}
                  className={`subcategory-btn ${selectedSubcategory === sub.id ? 'active' : ''}`}
                  onClick={() => handleSubcategoryClick(sub.id)}
                >
                  {sub.name} ({sub.products.length})
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="products-section">
          <div className="products-header">
            <h2>
              {selectedSubcategory
                ? category.subcategories.find((s) => s.id === selectedSubcategory)?.name
                : 'Todos los Productos'}
            </h2>
            <span className="products-count">
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <Filter size={48} />
              <h3>No se encontraron productos</h3>
              <p>Intenta cambiar los filtros o el término de búsqueda</p>
            </div>
          ) : (
            <div className={`products-grid ${viewMode}`}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                  showQuickActions={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de detalle del producto */}
      {selectedProduct && (
        <div className="modal-backdrop" onClick={closeProductModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeProductModal}>
              &times;
            </button>
            <h2>{selectedProduct.name}</h2>
            <img
              src={selectedProduct.imageUrl || '/placeholder.png'}
              alt={selectedProduct.name}
              style={{ maxWidth: '100%', maxHeight: 200, marginBottom: 16 }}
            />
            <p><strong>Categoría:</strong> {selectedProduct.subcategory.name}</p>
            <p><strong>Descripción:</strong> {selectedProduct.description || 'No disponible'}</p>
            <p><strong>Precio:</strong> ${selectedProduct.price.toFixed(2)}</p>
            <p><strong>Stock:</strong> {selectedProduct.stock}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
