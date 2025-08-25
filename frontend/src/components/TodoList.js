import React, { useState, useEffect, useRef } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export default function TodoList({ token, setToken, theme, username }) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/todos`, {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then(res => res.json())
      .then(setTodos);
  }, [token]);

  const addTodo = async () => {
    if (!input.trim()) return;
    const res = await fetch(`${API_BASE_URL}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ text: input }),
    });
    const todo = await res.json();
    setTodos([...todos, todo]);
    setInput('');
    inputRef.current?.focus();
  };

  const toggleTodo = async id => {
    const todo = todos.find(t => t.id === id);
    await fetch(`${API_BASE_URL}/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ text: todo.text, completed: !todo.completed }),
    });
    setTodos(todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = async id => {
    await fetch(`${API_BASE_URL}/api/todos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + token },
    });
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center py-10 transition-colors duration-700">
      <div className="bg-futuristic-card dark:bg-futuristic-card bg-opacity-90 p-8 rounded-xl shadow-neon w-full max-w-xl animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold tracking-wide text-white drop-shadow-lg">
            Your To-Do List
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-white font-medium">{username}</span>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                setToken(null);
              }}
              className="text-neon-blue hover:text-neon-purple underline transition-colors duration-300"
            >
              Log Out
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 px-4 py-2 rounded-lg bg-dark-bg dark:bg-dark-bg text-white border-2 border-neon-purple focus:outline-none focus:ring-2 focus:ring-neon-blue transition-all duration-300"
            value={input}
            ref={inputRef}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') addTodo();
            }}
            placeholder="Add a new task..."
          />
          <button
            onClick={addTodo}
            className="bg-neon-purple text-white px-4 py-2 rounded-lg font-bold shadow-neon hover:bg-neon-blue transition-all duration-200 active:scale-95"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={`flex items-center justify-between px-4 py-2 rounded-md cursor-pointer group transition-all duration-300 ease-in-out border
                ${
                  todo.completed
                    ? 'bg-gradient-to-r from-neon-purple to-neon-blue opacity-70 line-through border-transparent'
                    : 'bg-dark-bg dark:bg-dark-bg hover:bg-futuristic-card dark:hover:bg-futuristic-card border-transparent hover:border-neon-purple hover:shadow-[0_0_8px_2px_rgba(191,90,242,0.7)]'
                } animate-fadeIn`}
              style={{ transitionProperty: 'background, opacity, border, box-shadow' }}
            >
              <span
                className="flex-1 select-none transition-all duration-300 text-white"
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="ml-4 text-red-600 hover:text-white hover:bg-red-600 p-1 rounded transition-colors duration-300"
                aria-label="Delete"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6 6a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1zm2 4a1 1 0 012 0v4a1 1 0 11-2 0v-4z" />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <div className="text-center text-neon-blue opacity-70 mt-4 animate-fadeIn">
            No tasks yet. Add one!
          </div>
        )}
      </div>
    </div>
  );
}
