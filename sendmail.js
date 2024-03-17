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
        from: '"Journal Submission 👻" <foo@example.com>', // sender address
        to: "", // list of receivers
        subject: "Verify your email address", // Subject line
        text: "Hello world?ASDFSDF", // plain text body
        html: `<div style="border: 2px solid aqua; border-radius: 5px; padding: 10px;">
        Hi Reshita,
        <p>
            Thank you for registering with us. Please use the following OTP to confirm your email address.
        </p>
        <div style="display: flex; justify-content: center; margin: 30px 0;">
            <button style="padding: 12px 39px; font-size: larger; font-weight: bold; outline: none; border: medium; background-color: #0040ff; color: wheat;border-radius: 6px;">456874</button>
        </div>
        <p>Thanks,
            <br>
            Team XYZ
        </p>
    </div>`
    });

    console.log("Message sent: %s", info.accepted, info.response, info.messageId, info.envelope);
}

main().catch(console.error);