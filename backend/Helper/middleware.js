const jwt = require('jsonwebtoken');
const usermodel = require('../Models/Register');


const requireSignIn = async (req, res, next) => {
  try {
    if(!req.headers.authorization)
    {
      return res.status(401).send({success:false, message:"no token provided"})
    }
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1]
    const decode = jwt.verify(
      token,
      "567YUHUJ9IOJKMLAFSDIHNJOMK"
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log("hello",error);
    return res.status(401).send({success:false,message:"unauthorized acc",error:error.message})
  }
};


const isAdmin = async (req, res, next) => {
  try {
    const user = await usermodel.findById(req.user._id);
    if (user.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};

module.exports = { requireSignIn, isAdmin };
