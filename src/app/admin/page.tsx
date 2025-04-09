'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

type User = {
  id: number;
  username: string;
  email: string;
  role: string;
};

const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const token = localStorage.getItem('authToken');  // Hent JWT token fra localStorage eller cookies
  
  // Hvis ikke token, redirect til login
  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  useEffect(() => {
    if (!token) return;
    
    // Fetch brugere, og send auth token i headeren
    axios.get('/admin/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(res => {
      setUsers(res.data.users);
    })
    .catch(err => {
      setError('Error fetching users');
      console.error('Error fetching users:', err);
    })
    .finally(() => setLoading(false));
  }, [token]);

  const handleDelete = async (userId: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setUsers(prev => prev.filter(user => user.id !== userId));
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center border-t">
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.username}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
