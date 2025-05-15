import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import debounce from 'lodash/debounce';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [] });
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(
    debounce(async (searchTerm) => {
      try {
        setError(null);
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/products?search=${searchTerm}`);
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please ensure the backend server is running.');
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCart(res.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
      if (err.response?.status === 401) {
        setCart({ items: [] });
      }
    }
  };

  useEffect(() => {
    fetchProducts(search);
    fetchCart();
  }, [search, fetchProducts]);

  const addToCart = async (productId) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/cart',
        { productId, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setCart(res.data);
      toast.success('Added to cart!', { position: 'top-right', autoClose: 3000 });
    } catch (err) {
      console.error('Error adding to cart:', err);
      if (err.response?.status === 401) {
        toast.error('Please log in to add to cart', { position: 'top-right', autoClose: 3000 });
      } else {
        toast.error('Failed to add to cart. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const res = await axios.put(
        'http://localhost:5000/api/cart',
        { productId, quantity: newQuantity },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setCart(res.data);
    } catch (err) {
      console.error('Error updating quantity:', err);
      toast.error('Failed to update quantity. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-2/3 p-3 border rounded shadow-sm mb-4 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {loading ? (
        <div className="text-center py-10 text-blue-500 font-semibold text-lg animate-pulse">
          Loading products...
        </div>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => {
            const cartItem = cart.items.find((item) => item.productId._id === product._id);
            const quantity = cartItem ? cartItem.quantity : 0;

            return (
              <div
                key={product._id}
                className="bg-white border rounded-lg p-4 shadow hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain rounded mb-4 bg-white flex items-center justify-center"
                  onError={(e) =>
                    (e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found')
                  }
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <p className="text-lg font-bold text-green-600 mb-3">₹{product.price}</p>

                {quantity === 0 ? (
                  <button
                    onClick={() => addToCart(product._id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded w-full"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center justify-center space-x-3 mt-2">
                    <button
                      onClick={() => updateQuantity(product._id, quantity - 1)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-lg font-bold"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product._id, quantity + 1)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-lg font-bold"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
