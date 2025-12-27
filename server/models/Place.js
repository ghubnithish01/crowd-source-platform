const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }],
  likes: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Place', placeSchema);
