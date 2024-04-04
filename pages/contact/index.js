import Title from '@/components/Shared/title';
import SharedLayout from "@/components/Shared/SharedLayout";
import {InlineWidget} from "react-calendly";
import Image from "next/image";
import logo from '@/assets/logo-big.png'
import {contactPageExtraLinks} from "@/components/global/links";
import {getDatabase} from "@/db/mongoConnection";


const Contact = ({calendlyLink, services = []}) => {
    return (
        <SharedLayout>
            <div className="relative min-h-[100vh]  flex w-full ">
                <div className="flex-grow">
                    <Title title='Contact'/>
                    <div>
                        <p className="text-6xl font-bold text-center mt-20">Contact</p>
                        <p className='text-center text-xl font-semibold mt-3 w-[40%] mx-auto'>Contact us for Inquires
                            and We
                            are there for
                            any help
                            regarding design.</p>
                        <form className='mx-auto  flex flex-col mt-20 gap-y-5 w-[60%]'>
                            <input type="text"
                                   className="input input-lg  input-bordered rounded-none border-base-200 focus:outline-0 duration-300 focus:border-black"
                                   placeholder='Name'/>
                            <input type="email"
                                   className="input input-lg  input-bordered rounded-none border-base-200 focus:outline-0 duration-300 focus:border-black"
                                   placeholder='Email'/>
                            <select
                                className="select select-lg select-bordered rounded-none border-base-200 focus:outline-0 duration-300 focus:border-black"
                            >
                                <option disabled>Service</option>
                                {services.map((s, i) => (
                                    <option key={i} value={s.title}>
                                        {s.title}
                                    </option>
                                ))}
                            </select>

                            <textarea placeholder="Message"
                                      className="h-36 textarea textarea-lg textarea-bordered rounded-none border-base-200 focus:outline-0 duration-300 focus:border-black"></textarea>
                            <button className="btn btn-primary btn-lg text-2xl text-white rounded-none">Send</button>

                        </form>
                    </div>

                    {/* Calendly */}
                    <div className="calendly mt-40 lg:w-[80%] mx-auto">
                        <InlineWidget
                            url={calendlyLink}
                            styles={{
                                height: '100vh',
                            }}
                            pageSettings={{
                                hideEventTypeDetails: false,
                                hideLandingPageDetails: true,
                            }}

                        />
                    </div>
                </div>


                {/* Right Sidebar */}
                <div
                    className="sticky hidden h-[100vh] justify-center top-0 right-0 bg-[#ebebeb] xl:flex items-end w-[25%]">
                    <div className="">
                        <Image src={logo} alt='pixel dynamics logo'/>
                        <div className='flex flex-col mt-5 select-none'>
                            <p className='text-3xl font-bold'>PixelDynamics</p>
                            <p className='text-xl font-semibold translate-y-[-30%]'>.studio</p>
                        </div>
                        <ul className='flex w-full gap-x-7 justify-between mt-5 mb-10 items-center'>
                            {contactPageExtraLinks.map((cl, i) => {
                                return (
                                    <li key={i}>
                                        <a
                                            href={cl.link}
                                            target='_blank'
                                            className=' text-xl '
                                        >
                                            <i className={cl.icon}></i>
                                        </a>
                                    </li>
                                );
                            })}

                            <li className=''>
                                <a
                                    href="https://www.artstation.com/pixeldynamics_studio"
                                    target='_blank'

                                >
                                    <svg fill="#000000" className="w-5" viewBox="0 0 32 32"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0 23.63l2.703 4.672c0.552 1.094 1.667 1.781 2.885 1.781h17.943l-3.724-6.453zM32 23.661c0-0.641-0.193-1.245-0.516-1.75l-10.516-18.276c-0.557-1.057-1.656-1.719-2.854-1.719h-5.557l16.24 28.135 2.563-4.432c0.5-0.849 0.641-1.224 0.641-1.958zM17.161 19.047l-7.255-12.568-7.26 12.568z"/>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </SharedLayout>
    );
};

export default Contact;


export async function getServerSideProps() {
    const CalendlyLink = process.env.CALENDLY_LINK;
    const db = await getDatabase();
    const servicesList = await db.collection('services').find().project({_id: 0}).toArray();

    return {
        props: {
            calendlyLink: CalendlyLink,
            services: servicesList
        }
    }
}