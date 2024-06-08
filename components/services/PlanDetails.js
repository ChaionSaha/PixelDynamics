import { PriceTagIcon } from "@/assets/CustomIcons/CustomIcon";
import BookACallButton from "@/components/services/BookACallButton";
import { setPlan } from "@/db/store";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import BuyNowButton from "./BuyNowButton";

const PlanDetails = ({ name, description, offers, price, discount, discountAmount, stripeApiId, packages, spid }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleBuyNowButtonClick = () => {
        dispatch(setPlan({ name, price, discount, discountAmount, stripeApiId, packages, spid }));
        router.push('/payment');
    }

    return (
        <div
            className="flex p-7 lg:px-12 laptop:px-10 justify-between flex-col bg-[#ebebeb] relative">
            {
                discount &&
                <div className="absolute right-[-2%] top-0 translate-y-[-50%] flex items-center gap-x-2 bg-black px-5 py-2 text-white">
                    <PriceTagIcon className='size-5 laptop:size-4' />
                    <p className="font-bold text-lg laptop:text-base laptop:font-semibold">Discounted</p>
                </div>
            }
            <div>
                <div
                    className="flex gap-x-5 items-center justify-between text-2xl laptop:text-2xl xl:text-3xl font-bold">
                    <p>{name}</p>
                    <p className="lg:text-xl laptop:text-xl xl:text-2xl text-lg">{discount ? +price-+discountAmount : +price}/MO USD</p>
                </div>
                <ul className="mt-3">
                    {
                        description.map((sd, i) => <li key={i}
                            className="text-lg laptop:text-lg xl:text-xl text-base-300">{sd.text}</li>)
                    }
                </ul>

                <ul className="mt-10 list-disc ps-5 flex flex-col gap-y-2">
                    {
                        offers.map((so, i) => <li key={i}
                            className="text-base">{so.text}</li>)
                    }
                </ul>
            </div>


            <div className="flex flex-col mt-16 gap-y-5">
                <BuyNowButton className="py-3 laptop:py-2 md:px-5 " handleClick={handleBuyNowButtonClick} />
                <BookACallButton className="py-3 laptop:py-2 md:px-5"/>
            </div>
        </div>
    );
};

export default PlanDetails;