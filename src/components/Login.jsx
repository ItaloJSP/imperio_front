import React, { useState } from 'react';
import api from '../api'; // importe o axios configurado

export default function Login({ onLoginSuccess, onCancel }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { username, password });
      localStorage.setItem('token', res.data.token);
      onLoginSuccess();
    } catch (err) {
      setError('Usuário ou senha inválidos');
    }
  };

  return (


    
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4 text-center">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        className="w-full p-3 mb-3 border rounded"
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="w-full p-3 mb-6 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-indigo-700 text-white p-3 rounded hover:bg-indigo-800 transition"
      >
        Entrar
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
