import React from 'react';
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

const Index = () => {
    return (
        <div>
        </div>
    );
};

export default Index;


export async function getServerSideProps(context) {
    const {req, res} = context;
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        return {
            redirect: {
                destination: '/admin',
                permanent: false,
            },
        }
    }

    return {
        redirect: {
            destination: '/admin/auth/login',
            permanent: false,
        },
    }
}