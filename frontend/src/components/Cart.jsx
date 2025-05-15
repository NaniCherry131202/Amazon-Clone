import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const [selectedItems, setSelectedItems] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cart`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setCart(res.data);
        const initialSelection = res.data.items.reduce((acc, item) => {
          acc[item.productId._id] = true;
          return acc;
        }, {});
        setSelectedItems(initialSelection);
      } catch (err) {
        console.error('Error fetching cart:', err);
        if (err.response?.status === 401) {
          alert('Please log in to view your cart');
          navigate('/login');
        }
      }
    };
    fetchCart();
  }, [navigate]);

  const handleSelectItem = (productId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/cart`, {
        productId,
        quantity: newQuantity,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCart(res.data);
      if (newQuantity <= 0) {
        setSelectedItems((prev) => {
          const newSelection = { ...prev };
          delete newSelection[productId];
          return newSelection;
        });
      }
    } catch (err) {
      console.error('Error updating quantity:', err);
      alert('Failed to update quantity. Please try again.');
    }
  };

  const totalAmount = cart.items
    .filter((item) => selectedItems[item.productId._id])
    .reduce((total, item) => total + item.productId.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-[#232F3E]">🛒 Your Shopping Cart</h2>

      {cart.items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.items.map((item) => (
              <div key={item.productId._id} className="flex border rounded-lg shadow-sm p-4 items-center bg-white">
                <input
                  type="checkbox"
                  checked={selectedItems[item.productId._id] || false}
                  onChange={() => handleSelectItem(item.productId._id)}
                  className="mr-4"
                />
                <img
                  src={item.productId.image}
                  alt={item.productId.name}
                  className="w-28 h-28 object-cover rounded-md border mr-4"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/150?text=No+Image')}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#232F3E]">{item.productId.name}</h3>
                  <p className="text-gray-600">Price: ₹{item.productId.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                    >−</button>
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                    >+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-white border rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-[#232F3E] mb-2">Subtotal</h3>
            <p className="text-lg text-gray-700 mb-4">Total Amount: ₹{totalAmount}</p>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-[#FF9900] hover:bg-[#e68a00] text-white font-semibold py-2 rounded-lg shadow transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
