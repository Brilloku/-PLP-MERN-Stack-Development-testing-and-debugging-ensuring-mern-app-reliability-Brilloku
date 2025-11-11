const express = require('express');
const Bug = require('../models/Bug');

const router = express.Router();

// Helper function to validate bug data
const validateBugData = (data) => {
  const { title, description } = data;
  if (!title || !description) {
    throw new Error('Title and description are required');
  }
  if (title.length > 100 || description.length > 500) {
    throw new Error('Title or description exceeds maximum length');
  }
  return true;
};

// Attach helper to router for testing
router.validateBugData = validateBugData;

// GET /api/bugs - Get all bugs
router.get('/', async (req, res, next) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json(bugs);
  } catch (error) {
    next(error);
  }
});

// GET /api/bugs/:id - Get a single bug
router.get('/:id', async (req, res, next) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }
    res.json(bug);
  } catch (error) {
    next(error);
  }
});

// POST /api/bugs - Create a new bug
router.post('/', async (req, res, next) => {
  try {
    validateBugData(req.body);
    const bug = new Bug(req.body);
    const savedBug = await bug.save();
    res.status(201).json(savedBug);
  } catch (error) {
    next(error);
  }
});

// PUT /api/bugs/:id - Update a bug
router.put('/:id', async (req, res, next) => {
  try {
    validateBugData(req.body);
    const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }
    res.json(bug);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/bugs/:id - Delete a bug
router.delete('/:id', async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }
    res.json({ message: 'Bug deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
