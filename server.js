const express = require('express');
const Product = require('./models/Product');
const app = express();

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const { category } = req.query;
    const products = await Product.find({ category });
    res.json(products);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
    