import React from 'react';
import Title from "@/components/Shared/title";
import PixelDynamicsLogo from "@/components/Shared/PixelDynamicsLogo";
import CustomInput from "@/components/Shared/CustomInput";
import Link from "next/link";
import {useForm} from "react-hook-form";

const Index = () => {

    const {register, handleSubmit} = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const handleFormSubmit = (formData) => {
        console.log(formData);
    }

    return (

        <div className="w-full h-full flex flex-col justify-center items-center">
            <Title title='Sign Up'/>

            <PixelDynamicsLogo/>
            <p className='mb-10 mt-2 text-lg'>Create a new account</p>
            <form className="w-[30%]  flex flex-col gap-y-5" onSubmit={handleSubmit(handleFormSubmit)}>
                <CustomInput register={register} registerField='name' type='text' label='Name'/>
                <CustomInput register={register} registerField='email' type='email' label='Email'/>
                <CustomInput register={register} registerField='password' type='password' label='Password'/>
                <CustomInput register={register} registerField='confirm-password' type='password'
                             label='Confirm Password'/>
                <button className='btn rounded-none hover:bg-base-200 hover:text-black'>Sign Up</button>
            </form>
            <p className='mt-5'>Already have an account?
                <Link href='/admin/login' className='underline ms-1'>Login</Link></p>
        </div>

    );
};

export default Index;