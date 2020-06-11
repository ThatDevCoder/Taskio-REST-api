const mongoose = require('mongoose');
// const validator = require('validator');
// const bcrypt = require('bcryptjs');

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed:{
        type: Boolean,
        required:true,
        default: false
    }
})

module.exports = Task