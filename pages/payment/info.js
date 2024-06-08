import { CheckedIcon, UnCheckedIcon } from "@/assets/CustomIcons/CustomIcon";
import usePlan from "@/components/hooks/usePlan";
import ControlledClientInput from "@/components/Shared/ControlledClientInput";
import ControlledPhoneInput from "@/components/Shared/ControlledPhoneInput";
import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import { setClient } from "@/db/store";
import { Button, cn, Radio, RadioGroup } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";


const Index = () => {
    const plan = usePlan();
    const client = useSelector(state => state.client);
    const [err, setErr] = useState("");
    const dispatch = useDispatch();
    const router = useRouter();

    const { control, reset, handleSubmit } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            whatsAppNumber: "",
            selectedPlan: ""
        }
    });

    useEffect(() => {
        if (client.selectedPlan)
            reset({...client});
        else
            reset({
                selectedPlan: plan.stripeApiId
            })
    }, [plan, reset, client]);

    const handleInfoSubmit = (formData) => { 
        setErr("");

        if(!formData.selectedPlan) {
            setErr("Please select a subscription plan");
            return;
        }

        if(formData.firstName.trim()==='' || formData.lastName.trim()==='' || formData.email.trim()==='' || formData.phone.trim()==='') {
            setErr("Please fill all fields");
            return;
        }

        dispatch(setClient(formData));
        router.push('/payment/pay');
    }
    
    return (
        <SharedLayout>
            <Title title='Personal Information' />
            
            <div className="md:pt-10 pt-5 lg:px-16 md:px-10 px-5">
                <p className="lg:text-4xl laptop:text-3xl text-2xl font-bold px-12 lg:px-0">Information</p>
                <p className="text-base-300 lg:text-2xl laptop:text-xl text-lg lg:w-[50%] mt-3">
                    To start your subscription, input your personal information & select your subscription type to make payment.
                </p>

                <form className="grid lg:grid-cols-2 lg:mt-20 mt-5 gap-x-40 gap-y-10" onSubmit={handleSubmit(handleInfoSubmit)}>
                    <div className="flex flex-col gap-5 gap-y-7 mt-10">
                        <div className="grid lg:grid-cols-2 gap-5">
                            <ControlledClientInput control={control} name={"firstName"} label={"First Name"} labelPlacement={"outside"}/>
                            <ControlledClientInput control={control} name={"lastName"} label={"Last Name"} labelPlacement={"outside"}/>
                        </div>
                        <div className="col-span-2">
                            <ControlledClientInput control={control} name={"email"} label={"Email"} labelPlacement={"outside"}/>
                        </div>
                        <div className="col-span-2">
                            <ControlledPhoneInput control={control} name={"phone"} label={"Phone Number"}/>
                        </div>
                        <div className="col-span-2">
                            <ControlledPhoneInput control={control} name={"whatsAppNumber"} label={"WhatApp Number"} rightSideLabel={"Optional"}/>
                        </div>
                        <div className="hidden lg:flex flex-col mt-14 mb-10 text-lg gap-y-1">
                            {
                                err && <p className="text-error">{err}</p>
                            }
                            <Button type="submit" radius="none" className="w-full text-lg laptop:text-base hover:bg-white border border-black font-bold py-6 laptop:py-4 hover:text-black bg-black text-white">Next</Button>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <p className="font-medium text-2xl laptop:text-xl">Subscription Type</p>
                        <Controller name="selectedPlan" control={control} render={({ field: { value, onChange } }) =>
                            <RadioGroup
                                value={value}
                                onValueChange={onChange}
                                className="mt-5"
                                classNames={{
                                    wrapper: "flex flex-col gap-y-5",
                                }}
                                
                            >
                                <CustomRadio value={plan.stripeApiId}>
                                    <div className="flex items-center gap-x-5">
                                        {
                                            value === plan.stripeApiId ? <CheckedIcon className='w-5 h-5'/> : <UnCheckedIcon className='w-5 h-5'/>
                                        }
                                        
                                        <div className="flex flex-col">
                                            <p className="text-xl laptop:text-lg font-bold">Monthly</p>
                                            <p className="text-base-300 laptop:text-sm">${plan.discount ? +plan.price - plan.discountAmount : +plan.price} / per month</p>
                                        </div>
                                    </div>
                                </CustomRadio>
                                {
                                    plan.packages &&  plan.packages.map((p, i) => (
                                        <CustomRadio key={p.apiId} value={p.apiId}>
                                            <div className="flex justify-between">
                                                <div className="flex items-center gap-x-5">
                                                    {
                                                        value === p.apiId ? <CheckedIcon className='w-5 h-5'/> : <UnCheckedIcon className='w-5 h-5'/>
                                                    }
                                                    <div className="flex flex-col">
                                                        <p className="text-xl laptop:text-lg font-bold">{p.name}</p>
                                                        <p className="text-base-300 laptop:text-sm">$
                                                            {p.cost} / per {p.monthCount} months
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="self-center font-bold laptop:text-sm">
                                                    {
                                                        p.discounted &&
                                                        <p>Save {p.offer}%</p>
                                                    }
                                                </div>
                                            </div>
                                        </CustomRadio>
                                    ))
                                }
                            </RadioGroup>
                            
                        } />
                        
                    </div>
                    <div className="flex flex-col lg:hidden text-lg gap-y-1 mb-10">
                        {
                            err && <p className="text-error">{err}</p>
                        }
                        <Button type="submit" radius="none" className="w-full text-lg hover:bg-white border border-black font-bold py-6 hover:text-black bg-black text-white">Next</Button>
                    </div>
                </form>
                
            </div>
        </SharedLayout>
    );
}

export default Index;

export const CustomRadio = (props) => {
    const {children, ...otherProps} = props;

    return (
        <Radio
            {...otherProps}
            className="w-full"
            classNames={{
                base: cn(
                    " max-w-full inline-flex m-0 p-4 items-center justify-between",
                    " cursor-pointer rounded-none gap-4 bg-[#ebebeb] border",
                    "data-[selected=true]:border-base-300 data-[selected=true]:bg-transparent"
                ),
                labelWrapper: "flex-grow",
                control: "bg-black group-data-[selected=true]:border-black",
                wrapper: "group-data-[selected=true]:border-black hidden"
            }}
        >
            {children}
        </Radio>
    );
};

