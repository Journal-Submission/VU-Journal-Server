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
        from: '"Journal Submission" <foo@example.com>', // sender address
        to: "sakhman3250@gmail.com", // list of receivers
        subject: "Email Verification", // Subject line
        // text: "Hello world?ASDFSDF", // plain text body
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: sans-serif; display: flex; justify-content: center;">
            <table role="presentation" cellspacing="0" cellpadding="0" style="background-color: #fff; max-width: 42rem;">
                <tr>
                    <td>
                        <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="background-color: #365cce; color: #fff; text-align: center;">
                            <tr>
                                <td>
                                    <div style="padding: 20px;">
                                        
                                        <span style="font-size: 1.5rem; font-weight: bold;">Verify your E-mail Address</span>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="padding: 20px;">
                            <tr>
                                <td>
                                    <h4 style="color: #374151;">Hi John Deo,</h4>
                                    <p style="line-height: 1.5; color: #4b5563;">Thank you for registering with us. Please use the following <strong>One Time Password (OTP)</strong></p>
                                    <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top: 20px; text-align: center;">
                                        <tr>
                                            <td style="border: 1px solid #365cce; border-radius: 5px; width: 30px; height: 30px; font-size: 20px; font-weight: bold; color: #365cce;">7</td>
                                            <td style="width: 10px;"></td>
                                            <td style="border: 1px solid #365cce; border-radius: 5px; width: 30px; height: 30px; font-size: 20px; font-weight: bold; color: #365cce;">3</td>
                                            <td style="width: 10px;"></td>
                                            <td style="border: 1px solid #365cce; border-radius: 5px; width: 30px; height: 30px; font-size: 20px; font-weight: bold; color: #365cce;">3</td>
                                            <td style="width: 10px;"></td>
                                            <td style="border: 1px solid #365cce; border-radius: 5px; width: 30px; height: 30px; font-size: 20px; font-weight: bold; color: #365cce;">3</td>
                                            <td style="width: 10px;"></td>
                                            <td style="border: 1px solid #365cce; border-radius: 5px; width: 30px; height: 30px; font-size: 20px; font-weight: bold; color: #365cce;">3</td>
                                            <td style="width: 10px;"></td>
                                            <td style="border: 1px solid #365cce; border-radius: 5px; width: 30px; height: 30px; font-size: 20px; font-weight: bold; color: #365cce;">3</td>
                                            
                                        </tr>
                                    </table>
                                    <p style="margin-top: 20px; line-height: 1.75; color: #4b5563;">This passcode will only be valid for the next <strong>2 minutes</strong></p>
                                    <p style="margin-top: 20px; color: #4b5563;">Thanks to,<br><strong>ABCD Team</strong></p>
                                </td>
                            </tr>
                        </table>
                        <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="background-color: #f3f4f6; color: #7b8794; padding: 20px;">
                            <tr>
                                <td>
                                    This email was sent from <a href="mailto:journal@vidyasagar.mail.ac.in" style="color: #365cce; text-decoration: none;">journal@vidyasagar.mail.ac.in</a>.
                                    If you'd rather not receive this kind of email, you can <a href="#" style="color: #365cce; text-decoration: none;">unsubscribe</a> or <a href="#" style="color: #365cce; text-decoration: none;">manage your email preferences</a>.
                                </td>
                            </tr>
                        </table>
                        <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="background-color: #365cce; color: #fff; padding: 20px; text-align: center;">
                            <tr>
                                <td>
                                    <p style="margin: 0; font-size: 12px;">&copy; 2024 Journal Submission. All Rights Reserved.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `
    });

    console.log("Message sent: %s", info.accepted, info.response, info.messageId, info.envelope);
}

main().catch(console.error);