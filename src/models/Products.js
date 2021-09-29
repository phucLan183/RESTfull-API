const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  review: {
    type: Number,
  },
  star: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  stock: {
    type: Number,
    required: true,
  },
  sale: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  cat_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories'
  },
  color_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Color'
  }],
  config_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Config'
  }]
}, {
  timestamps: true
});
const Products = mongoose.model('Products', ProductsSchema);
module.exports = Products