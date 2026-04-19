import Diet from '../models/Diet.js';

// @desc    Get logged in user meals
// @route   GET /api/diet
// @access  Private
export const getMeals = async (req, res) => {
  try {
    const meals = await Diet.find({ user: req.user._id }).sort({ date: -1 });
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Log a new meal
// @route   POST /api/diet
// @access  Private
export const createMeal = async (req, res) => {
  try {
    const { mealName, calories, protein, carbs, fats, date } = req.body;

    if (!mealName || !calories) {
      return res.status(400).json({ message: 'Please provide meal name and calories' });
    }

    const meal = new Diet({
      user: req.user._id,
      mealName,
      calories,
      protein: protein || 0,
      carbs: carbs || 0,
      fats: fats || 0,
      date: date || Date.now()
    });

    const savedMeal = await meal.save();
    res.status(201).json(savedMeal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
