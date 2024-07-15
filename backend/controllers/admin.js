const ordermodel = require("../Models/Service");
const usermodel = require("../Models/Register");
const mail = require("../Helper/emailuser")

//path = api/v1/admin/orders
const getorders = async (req, res) => {
  try {
    console.log("hello");
    const orders = await ordermodel.find();
    res.status(200).send({
      success: true,
      orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Error Occured",
    });
  }
};

//path = api/v1/admin//userdetails
const getuserDetails = async (req, res) => {
  try {
    const det = await usermodel.find();
    console.log(det);
    res.status(200).send({
      success: true,
      det,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Error occured",
      error: e.message,
    });
  }
};

//path = api/v1/admin//update-status
const updateservicestatus = async (req, res) => {
  try {
    const {ordermail, orderid, status } = req.body;
    const order = await ordermodel.findById(orderid);
    console.log(order)
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
        error:error.message
      });
    }
    order.status = status;
    console.log(ordermail)
    if(order.status === 'ready')
    {
      const passcode = Math.random().toString(36).slice(-6);
      mail(ordermail,`Vehicle is Ready for Delivery`, `Your Vehicle ${order.vnum} is ready for delivery. Pick it up as soon as possible. Thank you for choosing Us☺.`)
    }
    await order.save();
    res.status(200).send({
      success: true,
      message: "Order status updated successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success:false,
      message:"Error occurred"
    })
  }
};

module.exports = { getorders, getuserDetails, updateservicestatus };
