const bcrypt = require("bcrypt");

//This hashpassword function is to hash the password it uses bcrypt package
const hashpassword = async(password)=>{
    try{
        const saltrounds=10;
        const hashp = await bcrypt.hash(password,saltrounds);
        return hashp;
    }catch(error){
        console.log(error)
        throw new Error('Error while hashing password');
    }
}

//This confirmpass is used to check whether the password match or not during login
const confirmpass = async(password,confpassword)=>{
    try{
    return await bcrypt.compare(password,confpassword)
    }
    catch{
        throw new error('Error occured while comparing');
    }
}

module.exports = {
    hashpassword,
    confirmpass
  };