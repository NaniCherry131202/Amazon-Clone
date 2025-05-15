import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  const { search } = req.query;
  try {
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

export const addProduct = async (req, res) => {
  const { name, image, description, price } = req.body;
  try {
    const product = new Product({ name, image, description, price });
    await product.save();
    res.status(201).json({ message: 'Product added', product });
  } catch (err) {
    res.status(400).json({ message: 'Error adding product', error: err.message });
  }
};