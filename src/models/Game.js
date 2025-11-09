const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  platform: String,
  genre: String,
  developer: String,
  releaseYear: Number,
  description: String,
  imageUrl: String,
  hoursPlayed: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  rating: { type: Number, min: 0, max: 5 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', GameSchema);
