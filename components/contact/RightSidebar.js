import React from 'react';
import Image from "next/image";
import logo from "@/assets/logo-big.png";
import {contactPageExtraLinks} from "@/components/global/links";

const RightSidebar = () => {
    return (
        <div className="flex flex-col">
            <div className="self-center">
                <Image src={logo} alt='pixel dynamics logo'/>
                <div className='flex flex-col mt-5 select-none'>
                    <p className='text-3xl font-bold'>PixelDynamics</p>
                    <p className='text-xl font-semibold translate-y-[-30%]'>.studio</p>
                </div>
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
    );
};

export default RightSidebar;