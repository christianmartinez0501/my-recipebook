const express = require('express');
const pool = require('../db'); // Import the database connection
const router = express.Router();

// GET all recipes
router.get('/recipes', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM recipes');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Error fetching recipes' });
  }
});

// GET recipe by ID
router.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM recipes WHERE recipe_id = $1', [id]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    res.status(500).json({ error: 'Error fetching recipe by ID' });
  }
});

// POST a new recipe
router.post('/recipes', async (req, res) => {
  const { user_id, title, description, instructions, prep_time, cook_time, total_time } = req.body;
  try {
    await pool.query(
      'INSERT INTO recipes (user_id, title, description, instructions, prep_time, cook_time, total_time) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [user_id, title, description, instructions, prep_time, cook_time, total_time]
    );
    res.status(201).json({ message: 'Recipe added successfully' });
  } catch (error) {
    console.error('Error adding recipe:', error);
    res.status(500).json({ error: 'Error adding recipe' });
  }
});

// PUT update recipe by ID
router.put('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, instructions, prep_time, cook_time, total_time } = req.body;
  try {
    await pool.query(
      'UPDATE recipes SET title = $1, description = $2, instructions = $3, prep_time = $4, cook_time = $5, total_time = $6 WHERE recipe_id = $7',
      [title, description, instructions, prep_time, cook_time, total_time, id]
    );
    res.json({ message: 'Recipe updated successfully' });
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Error updating recipe' });
  }
});

// DELETE recipe by ID
router.delete('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM recipes WHERE recipe_id = $1', [id]);
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'Error deleting recipe' });
  }
});

module.exports = router;