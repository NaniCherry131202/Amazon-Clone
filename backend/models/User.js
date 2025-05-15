import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: String,
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
  cards: [{ number: String, expiry: String, cvv: String }],
  role: { type: String, default: 'user' }
});

export default mongoose.model('User', userSchema);