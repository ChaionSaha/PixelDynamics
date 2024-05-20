import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useForm } from "react-hook-form";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const { handleSubmit, register } = useForm();
    const handleFormSubmit = async(e) => {
        console.log(elements);
        try {
            // if (!stripe || !cardElement) return null;

            const { data } = await axios.post('/api/create-payment-intent', {
                amount: 89
            })
            const clientSecret = data;

            const result = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: 'http://localhost:3000/',
                },
            })
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            {/* <input className="input input-bordered" type="text" placeholder="Name" {...register("name", {required: true})} />
            <input className="input input-bordered" type="email" placeholder="email" {...register("email", {required: true})} /> */}
            <div className="w-[40%] p-5">
                {/* <CardElement className="p-3 border" options={{
                    style: {
                        base: {
                            fontSize: "18px",
                        }
                    }
                }} /> */}
                <PaymentElement className="flex flex-col py-10" options={{
                    
                }}>
                </PaymentElement>
                
            </div>
            <button type="submit" disabled={!stripe || !elements} className="btn ms-5">Submit</button>
        </form>
    );
}

export default PaymentForm;