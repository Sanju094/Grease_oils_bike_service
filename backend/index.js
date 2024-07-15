const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const authroutes = require('./routes/authroutes')
const userroutes = require('./routes/userrroutes')
const adminroutes = require('./routes/adminroutes')
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected to mongodb successfully");
})
.catch((err)=>
{
console.log(err);
})

//for registeration and login these are the root api's
app.use('/api/v1/auth', authroutes);
//for user based routes this is the root api
app.use('/api/v1/user', userroutes);
//for admin based routes this is the root api
app.use('/api/v1/admin',adminroutes)




app.listen(3002, ()=>{
console.log("server connected successfully and running on port 3002....")
})