import React from 'react';
import {getSession} from "next-auth/react";

const Index = () => {
    return (
        <div>
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
        redirect: {
            destination: '/admin/auth/login',
            permanent: false,
        },
    }
}