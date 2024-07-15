//it works when the user books the service.  \
//The admin will get the mail when the user books the service
require('dotenv').config()
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sanjuga9099@gmail.com",
        pass: process.env.pass
    }
});

function sendEmail(sub,cont,mail,name) {
    console.log(mail);
    const message = {
        from: `${name} <${mail}>`,
        to: "sanjugagopalsamy@gmail.com",
        subject: sub,
        text: cont
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.error("Error occurred while sending email:", err);
            return 0;
        } else {
            console.log("Email sent successfully",info.response)
            return 1;
        }
    });
}

module.exports = sendEmail;