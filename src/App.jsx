import React, { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import AddProduct from './pages/AddProduct';
import Login from './components/Login';
import api from './api';
import HeroCarousel from './components/HeroCarousel';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showLogin, setShowLogin] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await api.get('/products'); // rota pública
      setProducts(res.data);
    } catch (err) {
      console.error('Erro ao buscar produtos', err);
    }
  }

  

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    setShowLogin(false);
    fetchProducts();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  if (loggedIn) {
    // Painel administrativo
    return (

      
      <div className="max-w-md mx-auto p-4 bg-white min-h-screen">

        
         <img
        src="/src/assets/Imperio.png"
        alt="Logo da Minha Loja"
        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
      />

        <h1 className="text-3xl font-extrabold mb-6 text-indigo-700 text-center">
        Minha Loja
      </h1>

        <button
          onClick={handleLogout}
          className="fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded"
        >
          Sair
        </button>

        <h1 className="text-3xl font-extrabold mb-6 text-indigo-700">Painel Admin</h1>

        <AddProduct onAdd={fetchProducts} />

        <main className="mt-6 grid gap-6">
          {products.length === 0 ? (
            <p className="text-center text-gray-500">Nenhum produto cadastrado.</p>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </main>



      </div>

      
    );
  }

  if (showLogin) {
    return (
      <Login
        onLoginSuccess={handleLoginSuccess}
        onCancel={() => setShowLogin(false)}
      />
    );
  }

 // Tela pública
  return (
    <div className="min-h-screen bg-white">

      {/* Carrossel + Logo sobreposta */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden">
        <HeroCarousel />

        {/* Logo sobre o carrossel */}
        <div className="absolute inset-0 flex justify-center items-center">
          <img
            src="/src/assets/Imperio.png"
            alt="Logo da Minha Loja"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg border-4 border-white"
          />
        </div>
      </div>

      {/* Título da loja */}
      <h1 className="text-3xl font-extrabold mt-44 text-indigo-700 text-center">Império Moda</h1>

      {/* Lista de produtos */}
      <main className="grid gap-6 p-4 max-w-md mx-auto">
        {products.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum produto disponível.</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </main>

      {/* Botão de login */}
      <button
        onClick={() => setShowLogin(true)}
        className="fixed bottom-4 right-4 bg-indigo-700 text-white px-4 py-2 rounded shadow"
      >
        Login Admin
      </button>
    </div>
  );

}
