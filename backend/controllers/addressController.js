import Address from '../models/Address.js';

export const addAddress = async (req, res) => {
  const { street, city, state, zip } = req.body;
  try {
    const address = new Address({ userId: req.user._id, street, city, state, zip });
    await address.save();
    req.user.addresses.push(address._id);
    await req.user.save();
    res.json(address);
  } catch (err) {
    res.status(400).json({ message: 'Error adding address' });
  }
};