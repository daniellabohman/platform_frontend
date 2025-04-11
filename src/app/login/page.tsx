"use client";

import Login from "@/components/Login";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (email: string, password: string) => {
    setError("");  // Clear previous error

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      router.push("/courses");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Login failed. Check your credentials.";
      setError(msg);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Login onSubmit={handleSubmit} /> {/* Use the Login component with styles */}
    </div>
  );
};

export default LoginPage;
