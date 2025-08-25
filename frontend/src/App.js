import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // ✅ fixed import
import Login from './components/Login';
import TodoList from './components/TodoList';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [username, setUsername] = useState('');

  // Extract username from token
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token); // ✅ no .default needed
        setUsername(decoded.username); // adjust if your token uses a different key like `sub` or `email`
      } catch (err) {
        console.error("Invalid token:", err);
        setToken(null);
        localStorage.removeItem('token');
      }
    }
  }, [token]);

  // Apply dark/light theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={`min-h-screen font-futuristic transition-colors duration-700 ${theme === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      <ThemeToggle theme={theme} setTheme={setTheme} />
      {!token ? (
        <Login setToken={setToken} theme={theme} />
      ) : (
        <TodoList token={token} setToken={setToken} theme={theme} username={username} />
      )}
    </div>
  );
}

export default App;
