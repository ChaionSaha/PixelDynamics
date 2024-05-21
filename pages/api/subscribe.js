import { getDatabase } from '@/db/mongoConnection';

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

        const clientSubscriptionDetaiils = await stripe.subscriptions.list({
            customer: subscription.customer
        });
        console.log(clientSubscriptionDetaiils)
        await clientsCollection.insertOne({
            plan,
            client: {
                ...client,
                cardHolderName: name,
            }, 
            clientId : subscription.customer
        })

        res.status(200).send({ subscription });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}