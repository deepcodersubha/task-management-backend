const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/tasks'); // ← must match exact filename

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes); // ← line 15, this needs taskRoutes to not be undefined

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Render injects its own PORT — never hardcode 5000 in production
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));