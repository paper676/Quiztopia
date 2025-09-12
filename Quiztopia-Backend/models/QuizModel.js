const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [{
    type: String,
    required: true,
  }],
  answer: {
    type: String,
    required: true,
  }
});

const quizSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
  },
  questions: [questionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  score: {
    type: Number,
    default: null,
  },
  startTime: {
    type: Date,
    default: null,
  },
  timeTaken: {
    type: Number,
    default: null,
  },
  submitted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);