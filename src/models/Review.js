const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  reviewText: String,
  hoursPlayed: Number,
  difficulty: String,
  recommend: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
