import React from 'react';
import Title from "@/components/Shared/title";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import SharedLayout from "@/components/Shared/SharedLayout";

const AdminIndex = () => {
    return (
        <SharedLayout>
            <div>
                <Title title='Index'/>
                <p className='p-16 lg:text-5xl text-3xl font-bold'>Welcome to the Pixel Dynamics Dashboard</p>
            </div>
        </SharedLayout>
    );
};

export default AdminIndex;

export async function getServerSideProps(context) {
    const {req, res} = context;
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return {
            redirect: {
                destination: '/admin/auth/login',
                permanent: false,
            },

        }
    }


    return {
        props: {
            session: session.toString(),
        }
    }
}