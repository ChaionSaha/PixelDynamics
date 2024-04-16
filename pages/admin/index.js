import React from 'react';
import Title from "@/components/Shared/title";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

const AdminIndex = () => {
    return (
        <div>
            <Title title='Index'/>
            <p class='p-16 text-5xl font-bold'>Welcome to the Pixel Dynamics Dashboard</p>
        </div>
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