import React, {useState} from 'react';
import Title from "@/components/Shared/title";
import PixelDynamicsLogo from "@/components/Shared/PixelDynamicsLogo";
import {useForm} from "react-hook-form";
import CustomInput from "@/components/Shared/CustomInput";
import Link from "next/link";
import {Spinner} from "@nextui-org/react";
import {getSession, signIn} from "next-auth/react";
import {useRouter} from "next/router";

const Index = ({session}) => {
    const {register, handleSubmit} = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleFormSubmit = async ({email, password}) => {
        setIsLoading(true);
        setError('');
        const data = await signIn('credentials', {redirect: false, email, password});
        setIsLoading(false);
        if (data.error || data.status !== 200) {
            setError(data.error);
            return;
        }
        router.push('/admin');
    }


    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Title title='Login'/>
            <PixelDynamicsLogo/>
            <p className='mb-10 mt-2 text-lg'>Log in to your account</p>
            {
                error && <span className='text-error mb-3'>{error}</span>
            }
            <form className="lg:w-[30%] md:w-[70%] w-full px-5 lg:px-0 flex flex-col gap-y-5"
                  onSubmit={handleSubmit(handleFormSubmit)}>
                <CustomInput register={register} registerField='email' type='email' label='Email'/>
                <CustomInput register={register} registerField='password' type='password' label='Password'/>
                <button disabled={isLoading}
                        className='btn rounded-none hover:bg-base-200 hover:text-black'>{isLoading ?
                    <Spinner/> : "Login"}
                </button>
            </form>
            <p className='mt-5'>Don't have any account?
                <Link href='/admin/auth/signup' className='underline ms-1'>SignUp</Link></p>
        </div>
    );
};

export default Index;

export async function getServerSideProps(context) {
    const session = await getSession({req: context.req});
    console.log(session);

    if (session) {
        return {
            redirect: {
                destination: '/admin',
                permanent: false,
            }
        }
    } else {
        return {
            props: {}
        }
    }

    // return {
    //     props: {}
    // }
}