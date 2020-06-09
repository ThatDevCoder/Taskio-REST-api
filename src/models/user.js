const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        trim:true,
        required: true,
        lowercase:true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    age: {
        type:Number,
        trim:true,
        required:true,
        validate(value) { 
            if(value<0){
                throw new Error("Age cannot be negative")
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required:true,
        minlength: 6,
        validate(value) {
            if(value.toLowerCase().includes("password")){
                throw new Error("Password cannot contain the word password ")
            }
        }
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = User