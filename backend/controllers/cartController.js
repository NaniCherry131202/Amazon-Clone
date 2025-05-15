import Cart from '../models/Cart.js';

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    if (!cart) {
      return res.json({ items: [] });
    }
    res.json(cart);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching cart', error: err.message });
  }
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
    const updatedCart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ message: 'Error adding to cart', error: err.message });
  }
};

export const updateCartItemQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1); // Remove item if quantity is 0 or less
    } else {
      cart.items[itemIndex].quantity = quantity;
    }
    await cart.save();
    const updatedCart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ message: 'Error updating cart', error: err.message });
  }
};