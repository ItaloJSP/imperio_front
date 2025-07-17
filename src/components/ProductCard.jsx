import React from 'react';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow cursor-pointer select-none">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-56 object-contain rounded-lg mb-4"
        loading="lazy"
      />
      <h2 className="text-xl font-semibold text-indigo-700 mb-1">{product.name}</h2>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-sm font-medium text-gray-700">
        Tamanhos: <span className="font-normal">{product.sizes.join(', ')}</span>
      </p>
      <p className="text-sm font-medium text-gray-700 mb-3">
        Estoque: <span className="font-normal">{product.stock}</span>
      </p>
      <a
        href={`https://wa.me/61981119663?text=Olá, quero pedir o ${encodeURIComponent(
          product.name
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h1l1 2-2 2-1-2 2-2zM19 9c0 2-1 3-3 4s-3 1-4 1-3-1-4-3-1-3 1-5 4-2 6-1 3 3 3 4z"
          />
        </svg>
        Pedir via WhatsApp
      </a>
    </div>
  );
}
