import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).send({ message: "Invalid Method!" });

    const { name, email, service, message } = req.body;

    if(name.trim() === '' || email.trim() === '' || service.trim() === '' || message.trim() === '')
        return res.status(400).send({ message: 'Invalid Input!' });

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.MAIL_ADDRESS,
            pass: process.env.GOOGLE_SMTP_PASS,
        },
    });

    transporter.sendMail({
        from: process.env.MAIL_ADDRESS, // sender address
        to: process.env.MAIL_ADDRESS, // list of receivers
        subject: `Message from ${name}`, // Subject line
        // text: message, // plain text body
        html: `<div style="font-family: Helvetica, sans-serif; line-height: 1.5em; margin: 20px 0px;">
                <div style="margin-bottom: 14px">
                    <p style="color:rgba(0, 0, 0, 0.70); margin: 0px; font-size: 14px; font-weight: 400;">Name:</p>
                    <p style="margin: 0px; font-size: 16px; font-weight: 600;">${name}</p>
                </div>
                <div style="margin-bottom: 14px">
                    <p style="color:rgba(0, 0, 0, 0.70); margin: 0px; font-size: 14px; font-weight: 400;">Email:</p>
                    <p style="margin: 0px; font-size: 16px; font-weight: 600;">${email}</p>
                </div>
                <div style="margin-bottom: 14px">
                    <p style="color:rgba(0, 0, 0, 0.70); margin: 0px; font-size: 14px; font-weight: 400;">Service:</p>
                    <p style="margin: 0px; font-size: 16px; font-weight: 600;">${service}</p>
                </div>
                <div style="margin-bottom: 14px">
                    <p style="color:rgba(0, 0, 0, 0.70); margin: 0px; font-size: 14px; font-weight: 400;">Message:</p>
                    <p style="margin: 0px; font-size: 16px; font-weight: 600;">${message}</p>
                </div>
            </div>`
    })
        .then(() => res.status(200).send({ message: 'Email Sent!' }))
        .catch((err) => res.status(400).send(err));
    
}