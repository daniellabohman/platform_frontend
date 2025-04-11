// src/app/register/page.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Register from "@/components/Register"; // Import your Register component

const RegisterPage = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/register", data);
      setMessage("Registration successful! Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError("Registration failed. Try again.");
      console.error("Registration error:", err);
    }
  };

  return (
    <div>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Register onSubmit={handleSubmit} /> {/* Use the Register component */}
    </div>
  );
};

export default RegisterPage;
