// models/products.ts

import mongoose, { Schema, model, models } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  images: [{ type: String, required: true }], 
  price: { type: Number, required: true },
}, { timestamps: true });

// S'assurer que le modèle est compilé une seule fois
const Product = models.Product || model('Product', productSchema);
export default Product;