require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const { model } = require("../models/task");
sgMail.setApiKey(process.env.SGMAIL_API_KEY);
// const msg = {
//     to: "ramkishorflipkart@gmail.com",
//     from: "bordia999@gmail.com",
//     subject: "Sending with Twilio SendGrid is Fun",
//     text: "and easy to do anywhere, even with Node.js",
//     html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
// sgMail.send(msg);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "bordia999@gmail.com",
        subject: "Welcome to Task-Manager App!",
        text: `Welcome to the app ${name}`,
    });
};

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "bordia999@gmail.com",
        subject: "Tusii Kyu Jaa rhe ho?",
        text: `${name} please don't go, What could we have done better pls reply to this email`,
    });
};

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail,
};
