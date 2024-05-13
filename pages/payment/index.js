import PaymentForm from "@/components/payment/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Index = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm/>
        </Elements>
    );
}

export default Index;