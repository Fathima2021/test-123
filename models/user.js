const mongoose = require('mongoose');

const userSchema =new  mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    photo: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password:{
        type: String,
        trim: true,
        required: true 
    },
    mobile:{
        type: String,
        trim: true,
        required: true 
    },
    token:{
        type: String,
        trim: true,
    }
})

module.exports=mongoose.model('users',userSchema)