import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext.jsx';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, form);
      login(res.data.token, res.data.role);
      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err.response?.data?.message || 'Error logging in', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-[#232F3E] mb-6">Sign-In</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
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
            Login
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-6">
          New to Amazon?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-[#FF9900] hover:underline cursor-pointer font-medium"
          >
            Create your account
          </span>
        </p>
      </div>
    </div>
  );
}
