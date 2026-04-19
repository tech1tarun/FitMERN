import Workout from '../models/Workout.js';

// @desc    Get logged in user workouts
// @route   GET /api/workouts
// @access  Private
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id }).sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create new workout
// @route   POST /api/workouts
// @access  Private
export const createWorkout = async (req, res) => {
  try {
    const { exerciseName, sets, reps, weight, date } = req.body;

    if (!exerciseName || !sets || !reps || !weight) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const workout = new Workout({
      user: req.user._id,
      exerciseName,
      sets,
      reps,
      weight,
      date: date || Date.now()
    });

    const savedWorkout = await workout.save();
    res.status(201).json(savedWorkout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
