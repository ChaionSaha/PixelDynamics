import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import { getDatabase } from "@/db/mongoConnection";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";

import Stripe from "stripe";


const Index = ({ subscriptions, customerDetails, products }) => {
    const [selectedPlan, setSelectedPlan] = useState({});

    useEffect(() => {
        let temp = {};
        if (customerDetails.plan.packages)
            temp = customerDetails.plan.packages.find(pack => pack.apiId === customerDetails.client.selectedPlan);
        if (temp)
            setSelectedPlan(temp)
    }, [customerDetails]);


    return (
        <SharedLayout>
            <Title title={`Details for ${customerDetails.client.firstName} ${customerDetails.client.lastName}`} />
            <AdminPageTitle title="Client Details" />
            
            <div className="md:px-10 px-5 py-10 grid grid-cols-2 gap-10">
                <DisabledInput label="Name" value={`${customerDetails.client.firstName} ${customerDetails.client.lastName}`} />
                <DisabledInput label="Email" value={customerDetails.client.email } />
                <DisabledPhoneInput value={customerDetails.client.phone} label={'WhatsApp Number'} />
                <DisabledPhoneInput value={customerDetails.client.whatsAppNumber} label={'WhatsApp Number'} />
            </div>

            <div className="md:px-10 px-5 ">
                <p className="text-xl mb-3">Subscriptions List</p>
                <div className="overflow-x-auto bg-admin-secondary p-5 mb-5">
                    <table className="table table-lg  rounded-none">
                        <thead className='bg-admin-primary'>
                            <tr className='border-0'>
                                <th>SL.</th>
                                <th>Package Name</th>
                                <th>Package Amount</th>
                                <th>Package Duration</th>
                                <th>Package Status</th>
                                <th>Package Start Date</th>
                                <th>Package End Date</th>
                                <th>Package Cancel Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscriptions.map((sub,i) => (
                                <tr key={sub.id} className={`${timeDuration(sub.current_period_end) <= 15 ? timeDuration(sub.current_period_end) >= 0 ? 'bg-red-600' : 'bg-blue-600' : ''}  border-0`}>
                                    <td>{i + 1}</td>
                                    <td>{(products.find(p=>p.id===sub.plan.id)).product.name}</td>
                                    <td>{`$${sub.plan.amount / 100}`}</td>
                                    <td>{`${sub.plan.interval_count} ${sub.plan.interval}`}</td>
                                    <td>{upperCase(sub.status)} </td>
                                
                                    <td>{new Date(sub.current_period_start * 1000).toLocaleDateString('en-UK', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}</td>
                                    
                                    <td>{
                                        sub.status === 'canceled' ?
                                            "---" :
                                            <p >
                                                {    
                                                    (new Date(sub.current_period_end * 1000).toLocaleDateString('en-UK', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    } ))
                                                }
                                            </p>
                                    
                                    }</td>
                                    <td>
                                        {
                                            sub.status === 'canceled' && sub.canceled_at ?
                                                new Date(sub.canceled_at * 1000).toLocaleDateString('en-UK', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                }) : sub.cancel_at_period_end ? <p className="text-sm"> Package will be cancelled after period</p> : "---"
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </SharedLayout>
    );
}

export default Index;

export const getServerSideProps = async (ctx) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { id } = ctx.query;
    const subscriptions = await stripe.subscriptions.list({
        customer: id,
        status: 'all'
    });
    const db = await getDatabase();
    const customerDetails = await db.collection('clients').findOne({ clientId: id }, {
        projection: { _id: 0 }
    });

    const prices = await stripe.prices.list({ expand: ['data.product'] });
    

    return {
        props:{
            subscriptions: subscriptions.data, customerDetails, products: prices.data
        }
    }
}

const DisabledInput = ({label, value, className}) => {
    return <Input
        label={label}
        variant='bordered'
        size="lg"
        className={className}
        classNames={{
            base: 'text-white',
            inputWrapper: 'rounded-none border',
            label: 'text-white'
        }}
        disabled
        value={value}
    />
}


const DisabledPhoneInput = ({value, label}) => {
    return (
        <div className="flex flex-col gap-y-1 border">
            <div className="flex justify-between px-4 pt-2 pb-0 text-sm">
                <p className="text-[#52525B]">{label}</p>
            </div>
            <PhoneInput
                value={value}
                disabled
                specialLabel=""
                inputClass=" bg-transparent translate-y-[-10%] px-4 pb-2 text-white border-transparent focus:outline-0 rounded-none flex-grow"
                inputStyle={{
                    width: '100%',
                    borderRadius: '0px',
                }}
            />
        </div>
    );
}

const upperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const timeDuration = (periodEnd) => {
    let start = new Date();
    let end = new Date(periodEnd * 1000);
    return (end - start) / (1000 * 60 * 60 * 24);
}