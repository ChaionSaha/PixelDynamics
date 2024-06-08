import serviceHero from '@/assets/service-page-hero.png';
import SharedLayout from '@/components/Shared/SharedLayout';
import Title from '@/components/Shared/title';
import BookACallButton from '@/components/services/BookACallButton';
import PlanDetails from '@/components/services/PlanDetails';
import ServiceDetails from '@/components/services/ServiceDetails';
import { getDatabase } from '@/db/mongoConnection';
import Image from 'next/image';

const Services = ({ services = [], subscriptions = [] }) => {

    return (
        <SharedLayout>
            <Title title='Services' />
            <p className='text-xl font-bold md:text-2xl pt-7 ps-16 lg:text-3xl laptop:text-2xl'>
				What We Offer
            </p>
            <div className='px-10 pb-10 lg:ps-16 lg:pe-0'>
                <div className='grid mt-5 md:grid-cols-2 gap-y-5 '>
                    <p className='self-center text-2xl font-bold leading-tight xl:text-5xl laptop:text-4xl lg:text-3xl'>
						Transforming Visions into Masterpieces: Your Creative Partners.
                    </p>
                    <Image src={serviceHero} alt='service hero' />
                </div>

                {/* Services List Section */}
                <div className='grid mt-10 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 gap-7 lg:pe-10'>
                    {services.map((s, i) => {
                        return <ServiceDetails {...s} key={i} />;
                    })}
                </div>

                {/* Call Number Section */}
                <p className='mt-24 text-3xl font-bold text-center lg:mt-32 xl:mt-40'>
					Let's Talk Numbers
                </p>
                <div className='lg:pe-10 mt-7'>
                    <div className='flex flex-col justify-between px-8 py-6 border-2 border-black  md:flex-row gap-y-10'>
                        <div className='flex flex-col '>
                            <p className='text-2xl font-bold lg:text-3xl laptop:text-2xl'>Pay by Project</p>
                            <p className='text-base font-medium lg:text-xl laptop:text-base'>
								Pay the Precise Price for Your Work
                            </p>
                        </div>
                        <BookACallButton className='py-3 laptop:h-fit laptop:self-center' />
                    </div>
                </div>

                {/*  Subscription Section  */}
                <div className='flex flex-col mt-20 xl:mt-36 lg:mt-28 lg:pe-10'>
                    <div className='flex flex-col'>
                        <p className='text-xl font-bold lg:text-3xl'>Subscription Plans</p>
                        <p className='text-base lg:text-xl'>
							Fixed Monthly Cost for All Your Tasks
                        </p>
                    </div>

                    <div className='grid grid-cols-1 gap-10 mt-10 md:grid-cols-2 xl:grid-cols-3'>
                        {subscriptions.map((s, i) => {
                            return <PlanDetails {...s} key={i} />;
                        })}
                    </div>
                </div>

                {/* Doesnot match Section */}
                <div className='mt-20 lg:pe-10'>
                    <div className='ps-8 pe-16 py-6 bg-[#ebebeb] flex md:flex-row flex-col gap-y-10 justify-between '>
                        <div className='flex flex-col '>
                            <p className='text-base font-medium lg:text-xl laptop:text-base'>
								Doesn't Match with your demand?
                            </p>
                            <p className='text-2xl font-bold lg:text-3xl laptop:text-2xl'>
								Create Your Own Package
                            </p>
                        </div>

                        <BookACallButton className='py-3 laptop:h-fit laptop:self-center' />
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
        .project({ _id: 0 })
        .toArray();
    const packageList = await db
        .collection('subscriptionPlans')
        .find()
        .project({ _id: 0 })
        .toArray();
    return {
        props: {
            services: serviceList,
            subscriptions: packageList,
        },
    };
}
