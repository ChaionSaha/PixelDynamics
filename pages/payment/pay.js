import useClientDetails from "@/components/hooks/useClientDetails";
import usePlan from "@/components/hooks/usePlan";
import ControlledClientInput from "@/components/Shared/ControlledClientInput";
import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Index = () => {
    const plan = usePlan();
    const client = useClientDetails();
    const [err, setErr] = useState("");
    const [selectedPack, setSelectedPack] = useState({});
    const { control, handleSubmit } = useForm();

    useEffect(() => {
        const pack = plan.packages.find(pack => pack.apiId === client.selectedPlan);
        setSelectedPack(pack);
    },[plan, client])

    const handleInfoSubmit = (formData) => {
        console.log(formData);
    }
    
    return (
        <SharedLayout>
            <Title title='Personal Information' />
            
            <div className="md:pt-10 pt-5 lg:px-16 md:px-10 px-5">
                <p className="text-4xl font-bold">Let's Make Payment</p>
                <p className="text-base-300 text-2xl w-[50%] mt-3">
                    To start your subscription, input your card details to make payment. 
                    You will be redirected to Home Page. 
                </p>
                <form className="grid grid-cols-2 mt-20 gap-x-40" onSubmit={handleSubmit(handleInfoSubmit)}>
                    <div className="flex flex-col gap-5 gap-y-7 ">
                        <div>
                            <ControlledClientInput control={control} name={"cardHolderName"} label={"Cardholder's Name"} labelPlacement={"outside"}/>
                        </div>
                        <div>
                            <ControlledClientInput control={control} name={"cardNumber"} label={"Card Number"} labelPlacement={"outside"}/>
                        </div>
                        <div className="grid grid-cols-3 gap-7">
                            <ControlledClientInput control={control} name={"expMonth"} label={"Expiry Month"} labelPlacement={"outside"}/>
                            <ControlledClientInput control={control} name={"expYear"} label={"Expiry Year"} labelPlacement={"outside"}/>
                            <ControlledClientInput control={control} name={"cvc"} label={"CVC"} labelPlacement={"outside"}/>
                        </div>
                        <div className="flex flex-col mt-14 text-lg gap-y-1">
                            {
                                err && <p className="text-error">{err}</p>
                            }
                            <Button type="submit" radius="none" className="w-full  bg-black text-white">Pay</Button>
                        </div>
                    </div>

                    <div className="flex flex-col bg-[#ebebeb] h-fit p-10 py-16 w-[70%]">
                        <p>You're Paying</p>
                        <p className="text-5xl font-bold">${selectedPack ? selectedPack.cost : plan.discount ? +plan.price - +plan.discountAmount : +plan.price }</p>

                        <div className="mt-16 flex flex-col gap-y-3 text-xl">
                            <div className="flex w-full">
                                <div className="w-[80%]">
                                    <p>{plan.name}</p>
                                </div>
                                <div className="w-[20%] font-bold flex justify-end">
                                    <p>${plan.discount ? +plan.price - +plan.discountAmount : +plan.price}</p>
                                </div>
                            </div>
                            {
                                selectedPack &&
                                <div className="flex w-full">
                                    <div className="w-[80%]">
                                        <p>{selectedPack.name} Subscription</p>
                                    </div>
                                    <div className="w-[20%] font-bold flex justify-end">
                                        <p>${plan.discount ? (+plan.price - +plan.discountAmount)*selectedPack.monthCount : +plan.price*selectedPack.monthCount}</p>
                                    </div>
                                </div>
                            }
                            {
                                selectedPack && selectedPack.discounted &&
                                <div className="flex w-full">
                                    <div className="w-[80%]">
                                        <p>Discount</p>
                                    </div>
                                    <div className="w-[20%] font-bold flex justify-end">
                                        <p>
                                                ${plan.discount ?
                                                ((+plan.price - +plan.discountAmount) * +selectedPack.offer / 100) * selectedPack.monthCount
                                                :
                                                (+plan.price * +selectedPack.offer / 100) * selectedPack.monthCount
                                            }
                                        </p>
                                    </div>
                                </div>
                            }
                            <div className="mt-5">
                                <div className="border w-full border-black "></div>
                                <div className="flex w-full mt-2">
                                    <div className="w-[80%]">
                                        <p>Total</p>
                                    </div>
                                    <div className="w-[20%] font-bold flex justify-end">
                                        <p>
                                            ${selectedPack ? selectedPack.cost : plan.discount ? +plan.price - +plan.discountAmount : +plan.price }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </SharedLayout>
    );
}

export default Index;