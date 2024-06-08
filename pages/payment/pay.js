import { CheckedCircleIcon } from "@/assets/CustomIcons/CustomIcon";
import useClientDetails from "@/components/hooks/useClientDetails";
import usePlan from "@/components/hooks/usePlan";
import ControlledClientInput from "@/components/Shared/ControlledClientInput";
import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import { removeClient, removePlan, setPaidFalse, setPaidTrue } from "@/db/store";
import { Button, Modal, ModalBody, ModalContent, Spinner, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useTimer } from "react-timer-hook";

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);


const Index = () => {
    const plan = usePlan();
    const client = useClientDetails();
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedPack, setSelectedPack] = useState({});
    const { control, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    const time = new Date();
    time.setSeconds(time.getSeconds() + 3);

    const {
        seconds,
        start
    } = useTimer({
        expiryTimestamp: time, onExpire: () => {
            onClose();
            router.push('/');
        } , autoStart: false });

    useEffect(() => {
        if (plan && plan.packages) {
            const pack = plan.packages.find(pack => pack.apiId === client.selectedPlan);
            setSelectedPack(pack);
        } else {
            setSelectedPack(undefined);
        }
    }, [plan, client]);

    useEffect(() => {
        dispatch(setPaidFalse());
    },[])

    const handleInfoSubmit = async (formData) => {
        setLoading(true);
        setErr("");
        stripe.tokens.create({
            card: {
                number: formData.cardNumber,
                exp_month: formData.expMonth,
                exp_year: formData.expYear,
                cvc: formData.cvc
            }
        }).then(async (data) => {
            const response = await axios.post('/api/subscribe', {
                token: data.id,
                email: client.email, // Assuming you collect email as well
                planId: client.selectedPlan,
                name: formData.cardHolderName,
                plan, client
            });

            if (response.status === 200) {
                // Handle successful subscription
                dispatch(removeClient());
                dispatch(removePlan());
                dispatch(setPaidTrue());
                onOpen();
                start();
            } else {
                setErr(response.error);
            }
        })
            .catch((err) => setErr(err?.message))
            .finally(() => setLoading(false));
    }

    return (
        <SharedLayout>
            <Title title='Card Information' />
            <div className="md:pt-10 pb-10 pt-5 lg:px-16 md:px-10 px-5">
                <p className="lg:text-4xl laptop:text-3xl text-2xl px-12 lg:px-0 font-bold">Let's Make Payment</p>
                <p className="text-base-300 text-lg laptop:text-xl lg:text-2xl lg:w-[50%] mt-3">
                    To start your subscription, input your card details to make payment. 
                    You will be redirected to Home Page. 
                </p>
                <form className="grid lg:grid-cols-2 lg:mt-20 mt-10 gap-x-40 gap-y-10" onSubmit={handleSubmit(handleInfoSubmit)}>
                    <div className="flex flex-col gap-5 gap-y-7 ">
                        <div>
                            <ControlledClientInput control={control} name={"cardHolderName"} label={"Cardholder's Name"} labelPlacement={"outside"} />
                        </div>
                        <div>
                            <ControlledClientInput control={control} name={"cardNumber"} label={"Card Number"} labelPlacement={"outside"} />
                        </div>
                        <div className="grid lg:grid-cols-3 gap-7">
                            <ControlledClientInput control={control} name={"expMonth"} label={"Expiry Month"} labelPlacement={"outside"} />
                            <ControlledClientInput control={control} name={"expYear"} label={"Expiry Year"} labelPlacement={"outside"} />
                            <ControlledClientInput control={control} name={"cvc"} label={"CVC"} labelPlacement={"outside"} />
                        </div>
                        <div className="lg:flex hidden flex-col mt-14 text-lg gap-y-1">
                            {
                                err && <p className="text-error">{err}</p>
                            }
                            <Button disabled={loading} type="submit" radius="none" className="w-full text-lg laptop:text-base hover:bg-white border border-black font-bold py-6 laptop:py-4 hover:text-black bg-black text-white">
                                {
                                    loading ? <Spinner color='white' /> : "Pay"
                                }
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col bg-[#ebebeb] h-fit p-10 py-16 lg:w-[70%]">
                        <p>You're Paying</p>
                        <p className="text-5xl font-bold">${selectedPack ? selectedPack.cost : plan.discount ? +plan.price - +plan.discountAmount : +plan.price}</p>

                        <div className="mt-16 laptop:mt-10 flex flex-col gap-y-3 text-xl">
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
                                        <p>${plan.discount ? (+plan.price - +plan.discountAmount) * selectedPack.monthCount : +plan.price * selectedPack.monthCount}</p>
                                    </div>
                                </div>
                            }
                            
                            <div className="flex w-full">
                                <div className="w-[80%]">
                                    <p>Discount</p>
                                </div>
                                <div className="w-[20%] font-bold flex justify-end">
                                    {
                                        selectedPack && selectedPack.discounted ?
                                            <p>
                                            ${plan.discount ?
                                                    ((+plan.price - +plan.discountAmount) * +selectedPack.offer / 100) * selectedPack.monthCount
                                                    :
                                                    (+plan.price * +selectedPack.offer / 100) * selectedPack.monthCount
                                                }
                                            </p> :
                                            <p>$0</p>
                                    }
                                        
                                </div>
                            </div>
                            
                            <div className="mt-5">
                                <div className="border w-full border-black "></div>
                                <div className="flex w-full mt-2">
                                    <div className="w-[80%]">
                                        <p>Total</p>
                                    </div>
                                    <div className="w-[20%] font-bold flex justify-end">
                                        <p>
                                            ${selectedPack ? selectedPack.cost : plan.discount ? +plan.price - +plan.discountAmount : +plan.price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex lg:hidden flex-col text-lg gap-y-1 mb-10">
                        {
                            err && <p className="text-error">{err}</p>
                        }
                        <Button disabled={loading} type="submit" radius="none" className="w-full hover:bg-white border text-lg border-black font-bold py-6 hover:text-black bg-black text-white">
                            {
                                loading ? <Spinner color='white' /> : "Pay"
                            }
                        </Button>
                    </div>
                </form>
                <SuccessModal isOpen={isOpen} onClose={onClose} seconds={seconds} />
            </div>
        </SharedLayout>
    );
}

export default Index;


const SuccessModal = ({ isOpen, onClose, seconds }) => {


    return (
        <Modal
            size={"lg"}
            isOpen={isOpen}
            onClose={onClose}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            hideCloseButton={true}
        >
            <ModalContent className="rounded-none">
                {(onClose) => (
                    <>
                        <ModalBody className="p-20 flex flex-col items-center text-center">
                            <CheckedCircleIcon className="h-24 w-24" />
                            <p className="text-2xl font-bold mt-5">Congratulations!</p>
                            <p className="text-4xl font-bold">Payment Successful</p>
                            <p className="mt-10 text-xl">Redirecting to Homepage in <span className="font-bold">{seconds} sec</span></p>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>)
}
