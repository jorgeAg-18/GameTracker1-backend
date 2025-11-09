const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Obtener todas las reseñas
router.get('/', async (_req, res) => {
  const reviews = await Review.find().populate('gameId');
  res.json(reviews);
});

// Obtener reseñas por juego
router.get('/juego/:gameId', async (req, res) => {
  const reviews = await Review.find({ gameId: req.params.gameId });
  res.json(reviews);
});

// Crear reseña
router.post('/', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar reseña
router.put('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar reseña
router.delete('/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reseña eliminada' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
