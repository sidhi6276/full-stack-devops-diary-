const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connect karo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected!'))
  .catch(err => console.log('❌ MongoDB error:', err));

// Routes
app.use('/api/entries', require('./routes/entries'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: '🎉 Diary Backend chal raha hai!' });
});

app.listen(5000, () => {
  console.log('🚀 Server port 5000 pe chal raha hai!');
});
