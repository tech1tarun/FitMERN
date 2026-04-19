import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Profile specific fields
  age: { type: Number },
  height: { type: Number },
  heightUnit: { type: String, default: 'cm' },
  currentWeight: { type: Number },
  targetWeight: { type: Number },
  weightUnit: { type: String, default: 'lbs' },
  primaryGoal: { type: String, default: 'Weight Loss' }
}, {
  timestamps: true,
});

// Middleware to hash password before saving if it has been modified
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to verify password during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
