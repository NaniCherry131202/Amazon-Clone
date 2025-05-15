import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Checkout() {
  const [form, setForm] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    card: { number: '', expiry: '', cvv: '', saveCard: false },
  });
  const [user, setUser] = useState({ addresses: [], cards: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/user`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addressRes = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/address`, {
        street: form.street,
        city: form.city,
        state: form.state,
        zip: form.zip,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/checkout`, {
        addressId: addressRes.data._id,
        card: form.card,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      navigate('/order-confirmation');
    } catch (err) {
      console.error(err);
      alert('Error placing order');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
      <h2 className="text-3xl font-bold mb-6 text-[#232F3E]">Secure Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Shipping Address */}
        <div>
          <h3 className="text-xl font-semibold text-[#232F3E] mb-2">Shipping Address</h3>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Street"
              value={form.street}
              onChange={(e) => setForm({ ...form, street: e.target.value })}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#FF9900]"
              required
            />
            <input
              type="text"
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#FF9900]"
              required
            />
            <input
              type="text"
              placeholder="State"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#FF9900]"
              required
            />
            <input
              type="text"
              placeholder="Zip Code"
              value={form.zip}
              onChange={(e) => setForm({ ...form, zip: e.target.value })}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#FF9900]"
              required
            />
          </div>
        </div>

        {/* Payment Info */}
        <div>
          <h3 className="text-xl font-semibold text-[#232F3E] mb-2">Payment Information</h3>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Card Number"
              value={form.card.number}
              onChange={(e) => setForm({ ...form, card: { ...form.card, number: e.target.value } })}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#FF9900]"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Expiry (MM/YY)"
                value={form.card.expiry}
                onChange={(e) => setForm({ ...form, card: { ...form.card, expiry: e.target.value } })}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#FF9900]"
                required
              />
              <input
                type="text"
                placeholder="CVV"
                value={form.card.cvv}
                onChange={(e) => setForm({ ...form, card: { ...form.card, cvv: e.target.value } })}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#FF9900]"
                required
              />
            </div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={form.card.saveCard}
                onChange={(e) => setForm({ ...form, card: { ...form.card, saveCard: e.target.checked } })}
                className="mr-2"
              />
              <span className="text-gray-700">Save card for future use</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#FF9900] hover:bg-[#e68a00] text-white font-semibold py-3 rounded-lg shadow-md transition"
        >
          Place Your Order
        </button>
      </form>
    </div>
  );
}
