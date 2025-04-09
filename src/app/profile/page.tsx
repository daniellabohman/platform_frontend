import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token'); // hent token fra localStorage
    axios.get('/api/profile', { 
      headers: { Authorization: `Bearer ${token}` } 
    })
      .then(response => {
        setProfile(response.data);
        setBio(response.data.bio || '');
        setAddress(response.data.address || '');
        setPhone(response.data.phone_number || '');
        setProfilePicture(response.data.profile_picture || '');
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile.');
      });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Hent første fil
    if (file) {
      setProfilePicture(file); // Opdater state med filen
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('bio', bio);
    formData.append('address', address);
    formData.append('phone_number', phone);
    if (profilePicture) {
      formData.append('profile_picture', profilePicture); // Ved filupload, tilføj filen
    }

    try {
      const token = localStorage.getItem('auth_token');
      await axios.post('/api/profile', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}` 
        },
      });
      alert('Profile updated successfully');
      setError(null); // Reset fejltilstand
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      
      {/* Vis fejlmeddelelse, hvis der er en */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Vis profildata når de er hentet */}
      {profile && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Bio</label>
            <textarea 
              value={bio} 
              onChange={(e) => setBio(e.target.value)} 
            />
          </div>
          <div>
            <label>Address</label>
            <input 
              type="text" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input 
              type="text" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
            />
          </div>
          <div>
            <label>Profile Picture</label>
            <input 
              type="file" 
              onChange={handleFileChange} 
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
