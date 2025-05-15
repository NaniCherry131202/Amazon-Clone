import Cart from '../models/Cart.js';
import Order from '../models/Order.js';

export const checkout = async (req, res) => {
  const { addressId, card } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    if (!cart || !cart.items.length) return res.status(400).json({ message: 'Cart is empty' });
    const total = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
    const order = new Order({
      userId: req.user._id,
      items: cart.items,
      address: addressId,
      payment: { card, status: 'completed' }, // Mock payment
      total,
      status: 'pending',
    });
    await order.save();
    if (card.saveCard) {
      req.user.cards.push(card);
      await req.user.save();
    }
    await Cart.findOneAndUpdate({ userId: req.user._id }, { items: [] });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: 'Error during checkout' });
  }
};