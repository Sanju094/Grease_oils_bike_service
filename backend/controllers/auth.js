const usermodel = require("../Models/Register");
const { hashpassword, confirmpass } = require("../Helper/authHelper");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

//path = api/v1/auth/getst
const getStations = async (req, res) => {
  try {
    const users = await usermodel.find();
    console.log(users);
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Error fetching users",
    });
  }
};


//path = api/v1/auth/getuser
const getuser = async (req, res) => {
  try {
    const uid = req.user._id;
    const user = await usermodel.findOne({ _id: uid });
    console.log(uid);
    console.log(user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching user details",
    });
  }
};

//path = api/v1/auth/updatelocation
const updateLocation = async (req, res) => {
  try {
    const uid = req.user._id;
    const { location } = req.body;
    const user = await usermodel.findOneAndUpdate(
      { _id: uid },
      { location },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Location updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error updating location",
    });
  }
};

//path = api/v1/auth/register
const Register = async (req, res) => {
  try {
    const { name, email, password, phoneno, role, stna, location } = req.body;
    if (name == "") {
      return res.status(400).send("Enter the name");
    } else if (email == "") {
      return res.status(400).send("Enter the valid email");
    } else if (password == "") {
      return res.status(400).send("Enter the password");
    } else if (phoneno == "") return res.status(400).send("Enter the PhoneNo");
    console.log({ name, phoneno, email, password });
    const uid = uuidv4();
    const existinguser = await usermodel.findOne({ email });
    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered please Login",
      });
    }
    const hashedpassword = await hashpassword(password);
    if (role === "admin") {
      const user = new usermodel({
        name,
        email,
        password: hashedpassword,
        phoneno,
        role,
        stna,
        location,
        uid,
      });
      await user.save();
    } else {
      const user = new usermodel({
        name,
        email,
        password: hashedpassword,
        phoneno,
        role,
        uid,
      });
      await user.save();
    }
    res.status(201).send({
      success: true,
      message: "Registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error",
      error: error.message,
    });
  }
};

//path = api/v1/auth/login
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === "") {
      return res
        .status(400)
        .send({ success: false, message: "Enter a valid email" });
    } else if (password === "") {
      return res
        .status(400)
        .send({ success: false, message: "Enter a password" });
    }

    const existingUser = await usermodel.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    const passwordMatch = await confirmpass(password, existingUser.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .send({ success: false, message: "Password not matched" });
    }

    const token = jwt.sign(
      { _id: existingUser._id, role: existingUser.role },
      "567YUHUJ9IOJKMLAFSDIHNJOMK",
      { expiresIn: "7h" }
    );
    console.log(existingUser.stna);
    return res.status(200).send({
      success: true,
      message: "Logged in",
      token,
      role: existingUser.role,
      uid: existingUser._id,
      stna: existingUser.stna,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

module.exports = { Register, Login, getStations, getuser, updateLocation };
