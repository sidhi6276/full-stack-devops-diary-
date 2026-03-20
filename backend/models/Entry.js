const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  title:   { type: String, required: true },
  content: { type: String, required: true },
  mood: { 
    type: String, 
    enum: ['happy', 'sad', 'neutral', 'excited', 'angry'], 
    default: 'neutral' 
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Entry', entrySchema);
