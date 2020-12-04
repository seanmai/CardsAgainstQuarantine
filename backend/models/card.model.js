const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('./category.model');

const cardSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    }
    // Category: Category.schema
});

module.exports = mongoose.model('Card', cardSchema);