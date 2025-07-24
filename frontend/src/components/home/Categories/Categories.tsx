import React from 'react';
import { Monitor, Smartphone, Cpu, HardDrive, Headphones, ArrowRight } from 'lucide-react';
import './Categories.css';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  itemCount: number;
  featured?: boolean;
}

interface CategoriesProps {
  onCategoryClick?: (categoryId: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onCategoryClick }) => {
  const categories: Category[] = [
    {
      id: 'computers',
      name: 'Computadoras y Notebooks',
      icon: <Monitor size={48} />,
      description: 'PCs de escritorio, notebooks y workstations',
      itemCount: 150,
      featured: true
    },
    {
      id: 'smartphones',
      name: 'Celulares y Accesorios',
      icon: <Smartphone size={48} />,
      description: 'Smartphones, fundas, cargadores y más',
      itemCount: 200,
      featured: true
    },
    {
      id: 'components',
      name: 'Componentes de PC',
      icon: <Cpu size={48} />,
      description: 'GPU, RAM, SSD, procesadores y más',
      itemCount: 300,
      featured: true
    },
    {
      id: 'software',
      name: 'Software y Licencias',
      icon: <HardDrive size={48} />,
      description: 'Windows, Office, antivirus originales',
      itemCount: 80,
      featured: true
    },
    {
      id: 'peripherals',
      name: 'Periféricos',
      icon: <Headphones size={48} />,
      description: 'Teclados, mouse, auriculares, webcams',
      itemCount: 120,
      featured: true
    }
  ];

  return (
    <section id="categories" className="categories-section">
      <div className="categories-container">
        <div className="categories-header">
          <h2 className="categories-title">Explora nuestras categorías</h2>
          <p className="categories-subtitle">
            Encuentra exactamente lo que necesitas en nuestra amplia selección de productos tecnológicos
          </p>
        </div>
        
        <div className="categories-grid">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className={`category-card ${category.featured ? 'featured' : ''}`}
              onClick={() => onCategoryClick?.(category.id)}
            >
              <div className="category-icon">
                {category.icon}
              </div>
              <div className="category-content">
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>
                <div className="category-meta">
                  <span className="category-count">{category.itemCount}+ productos</span>
                  <ArrowRight className="category-arrow" size={16} />
                </div>
              </div>
              <div className="category-overlay" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;