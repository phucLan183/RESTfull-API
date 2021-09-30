const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  is_Admin: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: Array,
    required: false
  }
}, {
  timestamps: true
});
const User = mongoose.model('User', UserSchema);
module.exports = User
