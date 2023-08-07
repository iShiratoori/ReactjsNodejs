const mongoose = require('mongoose');

// Define the Token Schema
const tokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: '1h', // Set the token to expire in 1 hour
        default: Date.now,
    },
});

// Create the Token model
const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
