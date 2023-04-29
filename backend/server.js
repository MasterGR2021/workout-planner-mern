const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const workoutRoutes = require('./routes/workout');

const app = express();

app.use(express.json());

app.use('/api/workouts', workoutRoutes);

// connecting db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB & Listening at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
