require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const appsRoutes = require('./routes/apps');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/apps', appsRoutes);

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/ikurd';
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {
  console.log('MongoDB connected');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
})
.catch(err => console.error('MongoDB error', err));
