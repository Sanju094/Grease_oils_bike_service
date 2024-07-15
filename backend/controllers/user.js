const usermodel = require("../Models/Service");
const mail = require("../Helper/email");

//path = api/v1/user/service
const Service = async (req, res) => {
  try {
    const { name, email, phoneno, vnum, serv, date, service } = req.body;
    const user = new usermodel({
      name,
      email,
      phoneno,
      serv,
      date,
      vnum,
      userid: req.user._id,
      stna: service,
    });
    console.log({ name, email, phoneno, serv, vnum, date, service });
    await user.save();

    mail(
      "Service Booked",
      `${name} has booked the service for ${serv} on ${date}. Their contact address are phone no: ${phoneno} and email : ${email}`,
      email,
      name
    );

    res.status(200).send({
      success: true,
      message: "Service Booked Successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Error Occured",
    });
  }
};


//path = api/v1/user/userorder
const getuserorders = async (req, res) => {
  try {
    const orders = await usermodel.find({ userid: req.user._id });
    res.status(200).send({
      success: true,
      orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "error",
    });
  }
};

module.exports = { Service, getuserorders };
