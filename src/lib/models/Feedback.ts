// File: src/lib/models/Feedback.ts
import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  courseCode: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  teacherID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ratings: {
    clarity: Number,
    fairness: Number,
    engagement: Number,
    understanding: Number,
    materials: Number,
    easeToQuestion: Number,
    completedSyllabus: Number,
  },
  comment: { type: String },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);
