// src/routes/gameRoutes.js
const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// Obtener todos los juegos
router.get('/', async (_req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo juego
router.post('/', async (req, res) => {
  const { title, platform, genre, developer, releaseYear, description, imageUrl, hoursPlayed, completed, rating } = req.body;

  try {
    const newGame = new Game({ title, platform, genre, developer, releaseYear, description, imageUrl, hoursPlayed, completed, rating });
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 🔹 Obtener un juego por ID
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: 'Juego no encontrado' });
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔹 Actualizar un juego por ID
router.put('/:id', async (req, res) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedGame) return res.status(404).json({ message: 'Juego no encontrado' });
    res.json(updatedGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 🔹 Eliminar un juego por ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    if (!deletedGame) return res.status(404).json({ message: 'Juego no encontrado' });
    res.json({ message: 'Juego eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
