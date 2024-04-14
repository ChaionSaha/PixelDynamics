import React from 'react';
import Title from "@/components/Shared/title";
import PixelDynamicsLogo from "@/components/Shared/PixelDynamicsLogo";
import Link from "next/link";

const Index = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Title title='Sign Up Success'/>
            <PixelDynamicsLogo/>
            <p className='mb-10 mt-2 text-lg xl:w-[40%] lg:w-[60%] px-5 text-center'>Your account has been successfully
                created.
                Your
                account has to be
                accepted by one of our admins before you can login to your
                account.</p>

            <p className='mt-3 text-xl'>
                <Link href='/admin/auth/login' className='underline ms-1'>Go back to login</Link></p>
        </div>
    );
};

export default Index;