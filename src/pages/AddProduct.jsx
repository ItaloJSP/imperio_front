import React, { useState } from 'react';
import api from '../api'; // axios configurado

export default function AddProduct({ onAdd }) {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null); // ← agora é um arquivo
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [sizes, setSizes] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !imageFile) {
      alert('Por favor, preencha o nome e selecione uma imagem.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('sizes', JSON.stringify(sizes.split(',').map((s) => s.trim())));
      formData.append('stock', stock);
      formData.append('image', imageFile); // arquivo enviado aqui

      const token = localStorage.getItem('token');

      await api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      onAdd(); // atualiza a lista de produtos
      resetForm();
    } catch (err) {
      console.error('Erro ao adicionar produto:', err);
      alert('Erro ao adicionar produto');
    }
  };

  const resetForm = () => {
    setName('');
    setImageFile(null);
    setDescription('');
    setCategory('');
    setSizes('');
    setStock('');
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Adicionar Produto</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3" encType="multipart/form-data">
        <input
          type="text"
          placeholder="Nome do produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="p-2 border rounded"
          required
        />

        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded"
          rows={3}
        />

        <input
          type="text"
          placeholder="Categoria (ex: Camisa, Vestido)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Tamanhos (ex: P, M, G)"
          value={sizes}
          onChange={(e) => setSizes(e.target.value)}
          className="p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Estoque"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="p-2 border rounded"
          min="0"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition"
        >
          Adicionar Produto
        </button>
      </form>
    </div>
  );
}
