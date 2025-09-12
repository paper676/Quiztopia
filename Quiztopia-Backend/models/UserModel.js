const mongoose = require('mongoose');

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
    savedQuizzes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
    }],
    previousQuizzes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
    }],
}, { timestamps: true,minimize: false });

module.exports = mongoose.models.User || mongoose.model('User', userSchema);