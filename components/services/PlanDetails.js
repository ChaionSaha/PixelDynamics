import BookACallButton from "@/components/services/BookACallButton";

const PlanDetails = ({name, description, offers, price}) => {
    return (
        <div
            className="flex p-7  lg:px-12  justify-between flex-col bg-[#ebebeb]">
            <div>

                <div
                    className="flex gap-x-5 items-center justify-between text-2xl xl:text-3xl font-bold">
                    <p>{name}</p>
                    <p className="lg:text-xl xl:text-2xl text-lg">{price}</p>
                </div>
                <ul className="mt-3">
                    {
                        description.map((sd, i) => <li key={i}
                            className="text-lg xl:text-xl text-base-300">{sd.text}</li>)
                    }
                </ul>

                <ul className="mt-10 list-disc ps-5 flex flex-col gap-y-2">
                    {
                        offers.map((so, i) => <li key={i}
                            className="text-base">{so.text}</li>)
                    }
                </ul>
            </div>


            <BookACallButton className="py-5 md:px-5 mt-16"/>
        </div>
    );
};

export default PlanDetails;