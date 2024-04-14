import React, {useState} from 'react';
import Title from "@/components/Shared/title";
import PixelDynamicsLogo from "@/components/Shared/PixelDynamicsLogo";
import CustomInput from "@/components/Shared/CustomInput";
import Link from "next/link";
import {useForm} from "react-hook-form";
import axios from "axios";
import {Spinner} from "@nextui-org/react";
import {getSession} from "next-auth/react";

const Index = () => {

    const {register, handleSubmit} = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    });
    const [passMatch, setPassMatch] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [dbError, setDbError] = useState("");

    const handleFormSubmit = async ({name, email, password, confirmPassword}) => {
        setIsLoading(true);
        setPassMatch(true);
        setErrorMessage('');
        setDbError('');

        if (password.trim().length < 7) {
            setPassMatch(false);
            setErrorMessage('Password should be at least 7 characters long.');
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setPassMatch(false);
            setErrorMessage('Passwords should be matched');
            setIsLoading(false);
            return;
        }

        axios.post('/api/auth/signup', {
            name,
            email,
            password,
            confirmPassword
        }).then(data => {
            console.log(data);
            setIsLoading(false);
        })
            .catch(({response}) => {
                console.log(response);
                setDbError(response.data.message);
                setIsLoading(false);
            });


    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Title title='Sign Up'/>
            <PixelDynamicsLogo/>
            <p className='mb-10 mt-2 text-lg'>Create a new account</p>
            {
                dbError && <span className='text-error mb-3'>{dbError}</span>
            }
            <form className="lg:w-[30%] md:w-[70%] w-full px-5 lg:px-0 flex flex-col gap-y-5"
                  onSubmit={handleSubmit(handleFormSubmit)}>
                <CustomInput register={register} registerField='name' type='text' label='Name'/>
                <CustomInput register={register} registerField='email' type='email' label='Email'/>
                <CustomInput register={register} registerField='password' type='password' label='Password'
                             isInvalid={!passMatch}/>
                <CustomInput register={register} registerField='confirmPassword' type='password'
                             label='Confirm Password' isInvalid={!passMatch} errorMessage={errorMessage}/>
                <button disabled={isLoading}
                        className='btn rounded-none hover:bg-base-200 hover:text-black '>{isLoading ?
                    <Spinner/> : "Sign Up"}</button>
            </form>
            <p className='mt-5'>Already have an account?
                <Link href='/admin/auth/login' className='underline ms-1'>Login</Link></p>
        </div>

    );
};

export default Index;

export async function getServerSideProps(context) {
    const session = await getSession({req: context.req});

    if (session) {
        return {
            redirect: {
                destination: '/admin',
                permanent: false,
            },
        }
    }

    return {
        props: {}
    }
}