import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ username: '', password: '', role: 'user' });
  const [bookForm, setBookForm] = useState({ title: '', author: '' });
  const [isRegistering, setIsRegistering] = useState(false);

  const fetchBooks = async () => {
    if (!token) return;
    const res = await fetch(`${API_BASE}/books`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, [token]);

  const handleLoginOrRegister = async () => {
    const endpoint = isRegistering ? 'register' : 'login';
    const res = await fetch(`${API_BASE}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok && data.token) {
      setToken(data.token);
      const userData = parseJwt(data.token);
      setUser(userData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      alert(data.message || 'Failed');
    }
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const handleAddBook = async () => {
    const res = await fetch(`${API_BASE}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(bookForm)
    });
    if (res.ok) {
      setBookForm({ title: '', author: '' });
      fetchBooks();
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`${API_BASE}/books/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) fetchBooks();
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.clear();
  };

  if (!token) {
    return (
      <div className="auth-container">
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {isRegistering && (
          <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        )}
        <button onClick={handleLoginOrRegister}>
          {isRegistering ? 'Register' : 'Login'}
        </button>
        <p onClick={() => setIsRegistering(!isRegistering)} style={{ cursor: 'pointer' }}>
          {isRegistering ? 'Already have an account? Login' : 'No account? Register here'}
        </p>
      </div>
    );
  }

  return (
    <div className="app">
      <h2>Welcome, {user?.username} ({user?.role})</h2>
      <button onClick={logout}>Logout</button>

      <h3>Books List</h3>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <strong>{book.title}</strong> by {book.author}
            {user.role === 'admin' && (
              <button onClick={() => handleDelete(book._id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>

      {user.role === 'admin' && (
        <>
          <h3>Add a Book</h3>
          <input
            type="text"
            placeholder="Title"
            value={bookForm.title}
            onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Author"
            value={bookForm.author}
            onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
          />
          <button onClick={handleAddBook}>Add Book</button>
        </>
      )}
    </div>
  );
}

export default App;
