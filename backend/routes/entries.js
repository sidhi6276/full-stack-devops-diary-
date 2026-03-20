const router  = require('express').Router();
const Entry   = require('../models/Entry');

// Saari entries lao
router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find().sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Nayi entry banao
router.post('/', async (req, res) => {
  try {
    const entry = await new Entry(req.body).save();
    res.json(entry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Entry update karo
router.put('/:id', async (req, res) => {
  try {
    const entry = await Entry.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    res.json(entry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Entry delete karo
router.delete('/:id', async (req, res) => {
  try {
    await Entry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entry delete ho gayi!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
