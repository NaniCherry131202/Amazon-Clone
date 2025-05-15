import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
  address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
  payment: { card: { number: String, expiry: String, cvv: String }, status: String },
  total: Number,
  status: String,
});

export default mongoose.model('Order', orderSchema);