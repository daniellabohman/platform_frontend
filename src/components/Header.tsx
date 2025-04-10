'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    window.location.href = '/'; // or use next/router
  };

  return (
    <header className="site-header">
      <div className="left">
        <Link href="/" className="logo">
          nExpertia
        </Link>
        <nav>
          <Link href="/courses">Courses</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>

      <div className="right">
        <input type="text" className="search" placeholder="Search courses..." />
        {!isLoggedIn ? (
          <div className="auth-buttons">
            <Link href="/login" className="login">
              Log ind
            </Link>
            <Link href="/register" className="signup">
              Tilmed
            </Link>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link href="/admin" className="login">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="signup">
              Log ud
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
