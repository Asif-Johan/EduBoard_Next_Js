// File: src/lib/models/Course.ts
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  admin_only_code: { type: String, required: true },
  courseCode: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);