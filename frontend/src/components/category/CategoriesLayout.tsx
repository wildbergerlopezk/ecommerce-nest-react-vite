import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoryPage from './CategoryPage';
import './CategoriesLayout.css';

interface CategoriesLayoutProps {
  apiBaseUrl?: string;
}

const CategoriesLayout: React.FC<CategoriesLayoutProps> = ({
  apiBaseUrl = 'http://localhost:3000'
}) => {

  return (
    <div className="categories-layout">

      <Routes>
        <Route
          path="/"
          element={<CategoriesOverview apiBaseUrl={apiBaseUrl} />}
        />
        <Route
          path="/:slug"
          element={<CategoryPage apiBaseUrl={apiBaseUrl} />}
        />
      </Routes>
    </div>
  );
};

const CategoriesOverview: React.FC<{ apiBaseUrl: string }> = ({ apiBaseUrl }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="categories-overview">
        <div className="overview-loading">
          <div className="loading-spinner"></div>
          <p>Cargando categorías...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="categories-overview">
      <div className="overview-header">
        <h1 className="overview-title">Todas las Categorías</h1>
        <p className="overview-description">
          Explora nuestra amplia gama de productos organizados por categorías
        </p>
      </div>

      <div className="categories-grid">
        {categories.map((category: any) => (
          <div key={category.id} className="category-overview-card">
            <div className="category-card-content">
              <h3 className="category-card-title">{category.name}</h3>
              {category.description && (
                <p className="category-card-description">{category.description}</p>
              )}
              <div className="category-card-stats">
                {category.subcategories?.length > 0 && (
                  <span className="stat">
                    {category.subcategories.length} subcategorías
                  </span>
                )}
              </div>
            </div>
            <div className="category-card-overlay">
              <button
                className="category-card-btn"
                onClick={() => window.location.href = `/categories/${category.slug}`}
              >
                Explorar Categoría
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesLayout;