// const server = require('express').Router();
// require('dotenv').config();
// const {apiKey, DOMAIN_MAIL} = process.env;
const nodeMailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const apiKey = "5101a993ea89f8a727220662d84437e1-9b1bf5d3-16f8019e";
const domain = "sandbox527c6302f6d34714bb76076aff61a0e5.mailgun.org";

const auth = {
    auth: {
        api_key: apiKey, 
        domain: domain
    }
};

const transporter = nodeMailer.createTransport(mailGun(auth));

function mailCreator (to, subject, text){

    const mailOptions = {
        from: "henrymov.g05@gmail.com",
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (err, data)=>{
        if (err) {
            console.log("Error => ",err)
        } else {
            console.log("Data => ",data)
        }
    })
}

module.exports = mailCreator;
