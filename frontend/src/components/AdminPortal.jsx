import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AdminPortal() {
  const [form, setForm] = useState({ name: '', image: '', description: '', price: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success('Product added successfully!', {
        position: "top-right",
        autoClose: 3000,
      });
      setForm({ name: '', image: '', description: '', price: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error adding product', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-[#232F3E] mb-6 text-center">🛒 Admin Portal - Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-[#FF9900] focus:border-[#FF9900]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-[#FF9900] focus:border-[#FF9900]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-[#FF9900] focus:border-[#FF9900]"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-[#FF9900] focus:border-[#FF9900]"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#FF9900] hover:bg-[#e68a00] text-white font-semibold py-2 rounded-lg shadow-md transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
