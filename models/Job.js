const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    company: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: ['Job', 'Internship'],
        required: true
    },

    location: {
        type: String,
        required: true
    },

    skillsRequired: {
        type: [String],
        default: []
    },

    salary: {
        type: String,
        default: 'Not specified'
    },

    lastDate: {
        type: Date,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Job', jobSchema);