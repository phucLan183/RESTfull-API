const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  unitShipping: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'PENDING',
    enum: ['PENDING', 'INPROCESS', 'SUCCESS']
  },
  products: [{}]
}, {
  timestamps: true
});
const Order = mongoose.model('Order', OrderSchema);
module.exports = Order
