import Title from '@/components/Shared/title';
import {getDatabase} from '@/db/mongoConnection';
import Image from "next/image";
import serviceHero from '@/assets/service-page-hero.png'

const Services = ({services = []}) => {
    return (
        <>
            <Title title='Services'/>
            <div className="pt-7 pb-10 ps-16">
                <p className=" text-3xl font-bold">What We Offer</p>
                <div className="grid lg:grid-cols-2 mt-10 ">
                    <p className="text-5xl font-bold self-center leading-tight">Transforming Visions into Masterpieces:
                        Your Creative
                        Partners.</p>
                    <Image src={serviceHero} alt="service hero"/>
                </div>
            </div>
        </>
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
    return {
        props: {
            services: serviceList,
        },
    };
}
