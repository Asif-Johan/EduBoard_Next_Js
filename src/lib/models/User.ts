// File: src/lib/models/User.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // only for non-OAuth
  role: { type: String, enum: ['student', 'teacher', 'admin'], required: true },
  verified: { type: Boolean, default: false },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', userSchema);