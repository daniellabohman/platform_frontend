// src/components/Register.tsx
"use client";

import { useState } from "react";
import styles from '../styles/register.module.css'; // Import your custom styles

const Register = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isInstructor, setIsInstructor] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      username,
      email,
      password,
      address,
      zip_code: zipCode,
      city,
      phone_number: phoneNumber,
      is_instructor: isInstructor,
    };

    onSubmit(data); // Trigger the parent onSubmit handler with form data
  };

  return (
    <div className={styles['register-page']}>
      <form className={styles['register-form']} onSubmit={handleSubmit}>
        <h1 className={styles['register-heading']}>Register</h1>
        {error && <p className={styles['error-message']}>{error}</p>}

        <input
          className={styles['register-input']}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />

        <input
          className={styles['register-input']}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <input
          className={styles['register-input']}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <input
          className={styles['register-input']}
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          required
        />

        <input
          className={styles['register-input']}
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="Zip Code"
          required
        />

        <input
          className={styles['register-input']}
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          required
        />

        <input
          className={styles['register-input']}
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          required
        />

        <button className={styles['register-button']} type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
