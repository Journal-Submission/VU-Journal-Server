const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "subrata3250das@gmail.com",
        pass: "yrjbtkucezdwzkev",
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Project Submission" <foo@example.com>', // sender address
        to: "sakhman3250@gmail.com", // list of receivers
        subject: "Submitted source code of the project with database", // Subject line
        // text: "Hello world?ASDFSDF", // plain text body
        html: ``
    });

    console.log("Message sent: %s", info.accepted, info.response, info.messageId, info.envelope);
}

main().catch(console.error);