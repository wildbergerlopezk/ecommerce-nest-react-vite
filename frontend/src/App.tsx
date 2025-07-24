import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import './App.css';
import ProductList from "./components/product/ProductList";
import HomePage from "./components/home/HomePage";
import ContactPage from "./components/home/Contact/Contact";
import { CartPage } from "./components/cart/CartPage";
import LoginForm from "./components/auth/Form/LoginForm/LoginForm";
import RegisterForm from "./components/auth/Form/RegisterForm/RegisterForm";
import UserPage from "./components/user/UserPage";
import { Success } from "./components/pages/Success";
import { Cancel } from "./components/pages/Cancel";

import CategoriesLayout from "./components/category/CategoriesLayout";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="body-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/categories/*" element={<CategoriesLayout />} />
            <Route
              path="/products"
              element={
                <ProductList
                  title="Catálogo de productos"
                  showFilters={true}
                  showSorting={true}
                  columns={4}
                />
              }
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/me" element={<UserPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
