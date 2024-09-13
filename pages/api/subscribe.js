import { getDatabase } from '@/db/mongoConnection';
import nodemailer from 'nodemailer';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const { token, email, planId, name, plan, client } = req.body;
    const db = await getDatabase();
    const clientsCollection = db.collection('clients');

    try {
        // Create a customer
        const customer = await stripe.customers.create({
            email: email,
            name: name
        });

        // Attach payment method (using the token) to the customer
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: { token: token },
        });

        // Attach the payment method to the customer
        await stripe.paymentMethods.attach(paymentMethod.id, {
            customer: customer.id,
        });

        // Set the customer's default payment method
        await stripe.customers.update(customer.id, {
            invoice_settings: {
                default_payment_method: paymentMethod.id,
            },
        });

        // // Subscribe the customer to the plan
        // const subscription = await stripe.subscriptions.create({
        //     customer: customer.id,
        //     items: [{ plan: planId }],
        // });

        // await clientsCollection.insertOne({
        //     plan,
        //     client: {
        //         ...client,
        //         cardHolderName: name,
        //     },
        //     clientId: subscription.customer
        // })

        let response;

        // Check if the plan is a subscription or one-time purchase
        if (plan.type === 'subscription') {
            // Handle subscription (recurring billing)
            const subscription = await stripe.subscriptions.create({
                customer: customer.id,
                items: [{ plan: planId }],
                default_payment_method: paymentMethod.id,
            });

            await clientsCollection.insertOne({
                plan,
                client: {
                    ...client,
                    cardHolderName: name,
                },
                clientId: subscription.customer,
                type: 'subscription',
            });

            response = { subscription };
        } else if (plan.type === 'package') {
            // Handle one-time purchase
            const paymentIntent = await stripe.paymentIntents.create({
                amount: +plan.price * 100, // amount in cents
                currency: 'usd', // adjust the currency as needed
                customer: customer.id,
                payment_method: paymentMethod.id,
                confirm: true, // Immediately confirm the payment
                description: `One-time purchase for ${plan.name}`,
                automatic_payment_methods: {
                    enabled: true,
                    allow_redirects: 'never', // Disable redirect-based payment methods
                },
            });

            await clientsCollection.insertOne({
                plan,
                client: {
                    ...client,
                    cardHolderName: name,
                },
                clientId: customer.id,
                type: 'package',
            });

            response = { paymentIntent };
        } else {
            return res.status(400).json({ message: 'Invalid plan type' });
        }

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
                    <p style="color:rgba(0, 0, 0, 0.70); margin: 0px; font-size: 14px; font-weight: 400;">Type:</p>
                    <p style="margin: 0px; font-size: 16px; font-weight: 600;">${plan.type}</p>
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

        res.status(200).send(response);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}