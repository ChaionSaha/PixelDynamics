import { AddressElement, CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useForm } from "react-hook-form";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const { handleSubmit } = useForm();
    const handleFormSubmit = async(e) => {
        const cardElement = elements?.getElement("card");
        try {
            if (!stripe || !cardElement) return null;

            const { data } = await axios.post('/api/create-payment-intent', {
                amount: 89
            })
            const clientSecret = data;

            const result=await stripe?.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            })
            console.log(result.paymentIntent);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="w-[50%] p-5">
                <CardNumberElement className="p-3 border" />
                <CardCvcElement className="p-3 border" />
                <CardExpiryElement className="p-3 border" />
                <AddressElement options={{
                    mode:"shipping"
                }}/>
                {/* <CardElement className="p-3 border" options={{
                    style: {
                        base: {
                            fontSize: "18px",
                        }
                    }
                }} /> */}
            </div>
            <button type="submit" disabled={!stripe || !elements} className="btn ms-5">Submit</button>
        </form>
    );
}

export default PaymentForm;