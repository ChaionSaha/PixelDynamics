import { getDatabase } from '@/db/mongoConnection';
import nodemailer from 'nodemailer';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'})
    }

    const { token, email, planId, name, plan, client } = req.body;
    const db = await getDatabase();
    const clientsCollection = db.collection('clients');

    try {
        // Create a customer
        const customer = await stripe.customers.create({
            source: token,
            email: email,
            name: name
        });

        // Subscribe the customer to the plan
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ plan: planId }],
        });

        await clientsCollection.insertOne({
            plan,
            client: {
                ...client,
                cardHolderName: name,
            }, 
            clientId : subscription.customer
        })

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: process.env.MAIL_ADDRESS,
                pass: process.env.GOOGLE_SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.MAIL_ADDRESS, // sender address
            to: process.env.MAIL_ADDRESS, // list of receivers
            subject: `New Subscription from ${name}`, // Subject line
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
                    <p style="color:rgba(0, 0, 0, 0.70); margin: 0px; font-size: 14px; font-weight: 400;">Plan Name:</p>
                    <p style="margin: 0px; font-size: 16px; font-weight: 600;">${plan.name}</p>
                </div>
                <div style="margin-bottom: 14px">
                    <p style="color:rgba(0, 0, 0, 0.70); margin: 0px; font-size: 14px; font-weight: 400;">Message:</p>
                    <p style="margin: 0px; font-size: 16px; font-weight: 600;">Please check the admin panel for more details!</p>
                </div>
            </div>`
        })
        

        res.status(200).send({ subscription });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}