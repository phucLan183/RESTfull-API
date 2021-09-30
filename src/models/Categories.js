const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategoriesSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true
});
const Categories = mongoose.model('Categories', CategoriesSchema);
module.exports = Categories
