import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Add this
import { register } from '../services/oprations/authService';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const dispatch = useDispatch(); // Add this
  const navigate = useNavigate();

  const handleChange = e =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(register(userData.username, userData.password, navigate));
    } catch (err) {
      setError('Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4 text-center">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <button type="submit" className="w-full bg-gray-800 text-white p-2 rounded">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-purple-500">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
