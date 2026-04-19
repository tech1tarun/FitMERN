import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    const user = await User.create({ name, email, password });
    if (user) {
       res.status(201).json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
    } else {
       res.status(400).json({ message: 'Invalid user data received' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({ _id: user._id, name: user.name, email: user.email, age: user.age, height: user.height, heightUnit: user.heightUnit, currentWeight: user.currentWeight, targetWeight: user.targetWeight, weightUnit: user.weightUnit, primaryGoal: user.primaryGoal, token: generateToken(user._id) });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.age = req.body.age || user.age;
      user.height = req.body.height || user.height;
      user.heightUnit = req.body.heightUnit || user.heightUnit;
      user.currentWeight = req.body.currentWeight || user.currentWeight;
      user.targetWeight = req.body.targetWeight || user.targetWeight;
      user.weightUnit = req.body.weightUnit || user.weightUnit;
      user.primaryGoal = req.body.primaryGoal || user.primaryGoal;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        age: updatedUser.age,
        height: updatedUser.height,
        heightUnit: updatedUser.heightUnit,
        currentWeight: updatedUser.currentWeight,
        targetWeight: updatedUser.targetWeight,
        weightUnit: updatedUser.weightUnit,
        primaryGoal: updatedUser.primaryGoal,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
