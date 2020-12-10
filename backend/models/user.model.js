const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {type: String, required: true},
    isAdmin: {type: Boolean}
});

module.exports = mongoose.model('User', userSchema);