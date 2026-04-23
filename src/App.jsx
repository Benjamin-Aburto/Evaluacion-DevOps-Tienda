import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './components/ProductDetail';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Registro from './pages/Registro';
import { CartProvider } from './context/CartContext';
import AdminPanel from './pages/AdminPanel';
import Categorias from './pages/Categorias'; // Nueva importación
import Ofertas from './pages/Ofertas';     // Nueva importación
import Nosotros from './pages/Nosotros';   // Nueva importación
import Contacto from './pages/Contacto';   // Nueva importación
import MisOrdenes from './pages/MisOrdenes'; // Nueva importación (asegúrate de que este archivo exista)

// Componente auxiliar para decidir si mostramos el Navbar
function Layout() {
  const location = useLocation();
  const esAdminPanel = location.pathname.startsWith('/admin');

  return (
    <>
      {!esAdminPanel && <Navbar />}
      <div className={!esAdminPanel ? "container container-main" : ""} style={!esAdminPanel ? { paddingTop: '80px' } : {}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/mis-ordenes" element={<MisOrdenes />} /> 

          {/* RUTA ADMIN SIMPLE */}
          <Route path="/admin/*" element={<AdminPanel />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout />
      </CartProvider>
    </BrowserRouter>
  );
}