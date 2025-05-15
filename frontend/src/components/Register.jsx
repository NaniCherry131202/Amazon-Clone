import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext.jsx';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Register form data:', form);
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, form);
      toast.success('Registration successful! Please log in.', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err.response?.data);
      const errorMessage = err.response?.data?.message || 'Error registering';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-[#232F3E] mb-6">Create your Amazon Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9900] focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9900] focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9900] focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#FF9900] hover:bg-[#e68a00] text-white font-semibold py-2 rounded-lg shadow-md transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-[#FF9900] hover:underline cursor-pointer font-medium"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
