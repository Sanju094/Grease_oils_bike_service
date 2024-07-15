//Register Schema
const mongoose = require('mongoose')

const Register = new mongoose.Schema(
{
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    phoneno:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        default:'user',
    }
    ,
    location:{
        type:String,
        
    },
    stna:{
        type:String,
    },
    uid:{
        type:String,
    }

})
module.exports  = mongoose.model('register',Register);
