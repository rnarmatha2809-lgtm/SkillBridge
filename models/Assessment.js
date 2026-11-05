
const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },

    role: {
        type: String,
        required: true
    },

    score: {
        type: Number,
        required: true,
        min: 0
    },

    totalQuestions: {
        type: Number,
        required: true,
        min: 1
    },

    percentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },

    skillResults: [{
        skill: {
            type: String,
            required: true
        },
        correct: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    }],

    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Assessment', assessmentSchema);
