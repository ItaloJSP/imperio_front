import React, { useState } from 'react';
import api from '../api';

export default function Register({ onRegisterSuccess, onCancel }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/register', { username, password });
      setLoading(false);
      onRegisterSuccess(); // ex: mostrar login
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Erro ao cadastrar usuário');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4 text-center">Cadastrar Usuário</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full p-3 mb-3 border rounded"
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-3 mb-6 border rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-700 text-white p-3 rounded hover:bg-indigo-800 transition"
      >
        {loading ? 'Cadastrando...' : 'Cadastrar'}
      </button>
      {onCancel && (
        <button
          onClick={onCancel}
          type="button"
          className="w-full mt-3 bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400 transition"
        >
          Cancelar
        </button>
      )}
    </form>
  );
}
