// src/lib/utils/connectToDB.ts
import mongoose from 'mongoose';

console.log('process.env.MONGODB_URI:', process.env.MONGODB_URI);

const MONGODB_URI = process.env.MONGODB_URI as string;

console.log('MONGODB_URI:', MONGODB_URI);


export const connectToDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Optional: Force stop if DB connection fails
  }
};
