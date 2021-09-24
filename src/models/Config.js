const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ConfigSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true
});
const Config = mongoose.model('Config', ConfigSchema);
module.exports = Config