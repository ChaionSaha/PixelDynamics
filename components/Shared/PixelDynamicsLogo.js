import React from 'react';
import Image from "next/image";
import logo from "@/assets/logo-big.png";

const PixelDynamicsLogo = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="relative w-16 h-16">
                <Image src={logo} fill alt='pixel dynamics logo'/>
            </div>
            <div className='flex flex-col mt-5 select-none'>
                <p className='text-3xl font-bold'>PixelDynamics</p>
            </div>
        </div>
    );
};

export default PixelDynamicsLogo;