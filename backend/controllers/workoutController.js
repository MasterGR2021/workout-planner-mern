const Workout = require('../models/workoutModel');

const mongoose = require('mongoose');

// create a new workout

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!load) {
    emptyFields.push('load');
  }
  if (!reps) {
    emptyFields.push('reps');
  }

  if (emptyFields.length > 0) {
    res.status(400).json({ error: `Input Fields can't be empty`, emptyFields });
  } else {
    try {
      const workout = await Workout.create({ title, load, reps });
      res.status(200).json(workout);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

// Get all workouts
const getWorkouts = async (req, res) => {
  try {
    const workout = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ error: 'No such workout found!' });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(400).json({ error: 'No such workout found!' });
  }
  res.status(200).json(workout);
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ error: 'No such workout found!' });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    res.status(400).json({ error: 'No such workout found!' });
  }

  res.status(200).json(workout);
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ error: 'No such workout found!' });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    res.status(400).json({ error: 'No such workout found!' });
  }

  res.status(200).json(workout);
};

// exports
module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
