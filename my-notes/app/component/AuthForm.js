'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/auth.css';

export default function AuthForm({ type }) {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    type === 'signup' ? handleSignUp(e) : handleLogin(e);
  };


  const handleSignUp = async (e) => {
    e.preventDefault();
    setMessage(''); 

    console.log("fromdata", formData)

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setTimeout(() => {
          console.log("redirecting............")
          router.push('/login');
        }, 1000);
      } else {
        setMessage(data.error || "Signup failed");
      }
    } catch (err) {
      console.error('Signup error:', err);
      setMessage('Something went wrong. Please try again.');
    }
  };

  console.log("message", message)

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("Login response:", data); 

      if (response.ok) {
        setMessage(data.message);
        localStorage.setItem('username', data.username);
        setTimeout(() => {
          console.log("redirecting............")
          router.push('/notes');
        }, 1000);
      } else {
        setMessage(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="auth-form-header">
          <div className="dot red"></div>
          <div className="dot yellow"></div>
          <div className="dot green"></div>
        </div>
        <form onSubmit={handleSubmit} className="auth-form-body">
          <h2>{type === 'login' ? 'Login' : 'Sign up'}</h2>

          {type === 'signup' && (
            <input
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          )}

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          {type === 'signup' && (
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
          )}

          <div className="form-buttons">
            <button type="submit">
              {type === 'login' ? 'Login' : 'Register'}
            </button>
            <a href={type === 'login' ? '/signup' : '/login'} >
              {type === 'login' ? 'Register' : 'Login'}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}