import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Registration attempt:', { name, email });
  try {
    if (!name || !email || !password) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'All fields (name, email, password) are required' });
    }
    const existingUser = await User.findOne({ email });
    console.log('Existing user check:', existingUser);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    console.log('User registered successfully:', user);
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error('Registration error:', err);
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      res.status(400).json({ message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists` });
    } else {
      res.status(400).json({ message: 'Error registering user', error: err.message });
    }
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    res.json({ token, role: user.role }); // Include role in login response
  } catch (err) {
    res.status(400).json({ message: 'Error logging in', error: err.message });
  }
};

export const getUser = async (req, res) => {
  res.json({ name: req.user.name, email: req.user.email, addresses: req.user.addresses, cards: req.user.cards, role: req.user.role });
};