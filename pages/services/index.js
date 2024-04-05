import Title from '@/components/Shared/title';
import {getDatabase} from '@/db/mongoConnection';
import Image from "next/image";
import serviceHero from '@/assets/service-page-hero.png'
import SharedLayout from "@/components/Shared/SharedLayout";
import BookACallButton from "@/components/services/BookACallButton";
import ServiceDetails from "@/components/services/ServiceDetails";
import PlanDetails from "@/components/services/PlanDetails";

const Services = ({services = [], subscriptions = [s]}) => {
    return (
        <SharedLayout>
            <Title title='Services'/>
            <p className="text-xl md:text-2xl pt-7 ps-16 lg:text-3xl font-bold">What We Offer</p>
            <div className="pb-10 lg:ps-16 lg:pe-0 px-10">
                <div className="grid md:grid-cols-2 gap-y-5 mt-5 ">
                    <p className="xl:text-5xl lg:text-3xl text-2xl font-bold self-center leading-tight">Transforming
                        Visions into
                        Masterpieces:
                        Your Creative
                        Partners.</p>
                    <Image src={serviceHero} alt="service hero"/>
                </div>

                {/* Services List Section */}
                <div className="mt-10 grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 gap-7 lg:pe-10">
                    {
                        services.map((s, i) => {

                            return <ServiceDetails {...s} key={i}/>
                        })
                    }
                </div>

                {/* Call Number Section */}
                <p className="text-center text-3xl font-bold mt-24 lg:mt-32 xl:mt-40">Let's Talk Numbers</p>
                <div className="lg:pe-10 mt-7">
                    <div
                        className=" border-2 px-10 lg:px-14 py-7 border-black flex flex-col md:flex-row gap-y-10 justify-between ">
                        <div className="flex flex-col ">
                            <p className="lg:text-3xl text-2xl font-bold">Pay by Project</p>
                            <p className="lg:text-xl text-base font-medium">Pay the Precise Price for Your Work</p>
                        </div>
                        <BookACallButton className="py-3"/>
                    </div>
                </div>

                {/*  Subscription Section  */}
                <div className="xl:mt-36 lg:mt-28 mt-20 flex flex-col lg:pe-10">
                    <div className="flex flex-col">
                        <p className="lg:text-3xl text-xl font-bold">Subscription Plans</p>
                        <p className="lg:text-xl text-base">Fixed Monthly Cost for All Your Tasks</p>
                    </div>

                    <div className="grid md:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-10 mt-10">
                        {
                            subscriptions.map((s, i) => {
                                return <PlanDetails {...s} key={i}/>
                            })
                        }
                    </div>
                </div>

                {/* Doesnot match Section */}
                <div className="lg:pe-10 mt-20">
                    <div
                        className="  px-10 lg:px-14 py-7 bg-[#ebebeb] flex md:flex-row flex-col gap-y-10 justify-between ">
                        <div className="flex flex-col ">
                            <p className="lg:text-xl text-base font-medium">Doesn't Match with your demand?</p>
                            <p className="lg:text-3xl text-2xl font-bold">Create Your Own Package</p>
                        </div>

                        <BookACallButton className="py-3"/>
                    </div>
                </div>
            </div>
        </SharedLayout>
    );
};

export default Services;

export async function getServerSideProps() {
    const db = await getDatabase();
    const servicesCollection = db.collection('services');
    const serviceList = await servicesCollection
        .find()
        .project({_id: 0})
        .toArray();
    const packageList = await db.collection('subscriptionPlans').find().project({_id: 0}).toArray();
    return {
        props: {
            services: serviceList,
            subscriptions: packageList
        },
    };
}
