
"use client";

import { useState } from "react";
// src/components/Login.tsx (or src/app/login/page.tsx)
import styles from '../styles/login.module.css';

const Login = ({ onSubmit }: { onSubmit: (email: string, password: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(email, password);  // Call the provided onSubmit function
    }
  };

  return (
    <div className={styles['login-page']}>
      <form className={styles['login-form']} onSubmit={handleSubmit}>
        <h1 className={styles['login-heading']}>Login</h1>
        {error && <p className={styles['error-message']}>{error}</p>}
        <input
          className={styles['login-input']}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className={styles['login-input']}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className={styles['login-button']} type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
