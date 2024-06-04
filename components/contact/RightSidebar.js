import logo from "@/assets/logo-big.png";
import { contactPageExtraLinks } from "@/components/global/links";
import Image from "next/image";

const RightSidebar = () => {
    return (
        <div className="flex flex-col">
            <div>
                <Image src={logo} alt='pixel dynamics logo'/>
                <div className='flex flex-col mt-5 select-none'>
                    <p className='text-3xl font-bold'>PixelDynamics</p>
                    <p className='text-xl font-semibold translate-y-[-30%]'>.studio</p>
                </div>
            </div>
            <ul className='flex  w-full gap-x-7 justify-between mt-5 mb-10 items-center'>
                {contactPageExtraLinks.map((cl, i) => {
                    return (
                        <li key={i}>
                            <a
                                href={cl.link}
                                target='_blank'
                                className=' text-xl '
                            >
                                {cl.icon}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default RightSidebar;