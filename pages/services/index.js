import Title from '@/components/Shared/title';
import {getDatabase} from "@/db/mongoConnection";
import {useEffect} from "react";

const Services = ({services}) => {
    useEffect(() => {
        console.log(services);
    }, [services]);
    return (
        <div className='container'>
            <Title title='Services'/>
            Services Page
        </div>
    );
};

export default Services;

export async function getServerSideProps(context) {
    const db = await getDatabase();
    const servicesCollection = db.collection('services');
    const serviceList = await servicesCollection.find().project({_id: 0}).toArray();
    return {
        props: {
            services: serviceList
        }
    }
}