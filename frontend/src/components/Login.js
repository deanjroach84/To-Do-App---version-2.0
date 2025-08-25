import React, { useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export default function Login({ setToken, theme }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const url = register ? '/api/register' : '/api/login';
    const res = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
    } else if (data.success) {
      setRegister(false);
      setError('Registered! You can now log in.');
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-futuristic-card dark:bg-futuristic-card bg-opacity-90 p-8 rounded-xl shadow-neon flex flex-col gap-4 min-w-[320px] animate-fadeIn"
      >
        <h2 className="text-3xl font-bold text-neon-blue mb-4 text-center tracking-wide">
          {register ? 'Register' : 'Login'}
        </h2>
        <input
          className="px-4 py-2 rounded-lg bg-dark-bg dark:bg-dark-bg text-white border-2 border-neon-purple focus:outline-none focus:ring-2 focus:ring-neon-blue transition-all duration-300"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="px-4 py-2 rounded-lg bg-dark-bg dark:bg-dark-bg text-white border-2 border-neon-purple focus:outline-none focus:ring-2 focus:ring-neon-blue transition-all duration-300"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-neon-purple text-white py-2 rounded-lg font-bold shadow-neon hover:bg-neon-blue transition-all duration-200"
        >
          {register ? 'Register' : 'Login'}
        </button>
        <button
          type="button"
          onClick={() => setRegister(!register)}
          className="text-neon-blue underline hover:text-neon-purple"
        >
          {register ? 'Have an account? Login' : 'No account? Register'}
        </button>
        <div className="text-red-400 text-center transition-opacity duration-300 animate-pulse">{error}</div>
      </form>
    </div>
  );
}
