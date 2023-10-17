
const nodemailer = require("nodemailer");

exports.sendEmail = async (mail, mailMsg) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.EMAIL,
        to: mail,
        subject: 'momentoSphere reset otp',
        html: mailMsg
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("ERROR", err)
        }
    })
}

