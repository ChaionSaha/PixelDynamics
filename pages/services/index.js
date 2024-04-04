import Title from '@/components/Shared/title';
import {getDatabase} from '@/db/mongoConnection';
import Image from "next/image";
import serviceHero from '@/assets/service-page-hero.png'
import SharedLayout from "@/components/Shared/SharedLayout";
import blackBox from '@/assets/black-box.png'

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

                <div className="mt-10 grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 gap-7 lg:pe-10">
                    {
                        services.map((s, i) => {
                            return <div key={i}
                                        className="flex flex-col border border-transparent hover:border-black duration-300 md:p-5 xl:p-9 py-8 bg-secondary hover:bg-base-100">
                                <p className="font-bold text-xl xl:text-2xl flex items-center gap-x-3">
                                    {/*<i className="bi bi-square-fill text-base"></i>*/}
                                    <Image src={blackBox} alt="black box"/>
                                    {s.title}
                                </p>
                                <ul className="flex flex-col mt-3 gap-y-2">
                                    {
                                        s.list.map((l, i) => <li key={i}
                                                                 className="xl:text-lg font-semibold">{l.text}</li>)
                                    }
                                </ul>
                            </div>
                        })
                    }
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
