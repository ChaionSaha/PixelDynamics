import React from 'react';
import Title from "@/components/Shared/title";
import PixelDynamicsLogo from "@/components/Shared/PixelDynamicsLogo";
import {useForm} from "react-hook-form";
import CustomInput from "@/components/Shared/CustomInput";
import Link from "next/link";

const Index = () => {
    const {register, handleSubmit} = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const handleFormSubmit = async (formData) => {
        console.log(formData);
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Title title='Login'/>
            <PixelDynamicsLogo/>
            <p className='mb-10 mt-2 text-lg'>Log in to your account</p>
            <form className="lg:w-[30%] md:w-[70%] w-full px-5 lg:px-0 flex flex-col gap-y-5"
                  onSubmit={handleSubmit(handleFormSubmit)}>
                <CustomInput register={register} registerField='email' type='email' label='Email'/>
                <CustomInput register={register} registerField='password' type='password' label='Password'/>
                <button className='btn rounded-none hover:bg-base-200 hover:text-black'>Login</button>
            </form>
            <p className='mt-5'>Don't have any account?
                <Link href='/admin/auth/signup' className='underline ms-1'>SignUp</Link></p>
        </div>
    );
};

export default Index;