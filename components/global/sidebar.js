import React from 'react';
import logo from '@/assets/logo-gif.gif'
import Image from "next/image";

const Sidebar = () => {
    return (
        <div className='h-full text-base-200 w-full bg-theme-black py-10'>
            <div className="flex gap-x-5 items-start  px-7">
                <Image
                    src={logo}
                    alt='logo'
                    className='w-10 h-10'
                />
                <div className="flex flex-col">
                    <p className='text-xl font-bold'>PixelDynamics</p>
                    <p className='text-xs translate-y-[-30%]'>.studio</p>
                </div>
            </div>
            <p className='px-7 text-sm mt-7'>A studio powered by industry leading professionals.</p>

        </div>
    );
};

export default Sidebar;