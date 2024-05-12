import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {

    if (req.method !== 'POST')
        return res.status(405).send({ message: 'Invalid Method!' });

    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(amount) * 100,
            currency: "USD"
        });
        return res.status(200).send(paymentIntent.client_secret);
    } catch (e) {
        return res.status(500).send({ error: e.message });
    }

}