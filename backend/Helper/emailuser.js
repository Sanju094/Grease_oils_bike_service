// The user will get the mail when the owner marks the status of the booked service as ready.

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sanjuga9099@gmail.com",
        pass: "mocp szyd qjmx lpws"
    }
});

function sendEmail(whome, sub, cont) {
    const message = {
        from: "sanjuga9099@gmail.com",
        to: whome,
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