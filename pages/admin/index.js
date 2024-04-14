import React from 'react';
import Title from "@/components/Shared/title";
import {getSession} from "next-auth/react";

const AdminIndex = () => {
    return (
        <div>
            <Title title='Index'/>
            This is admin homepage
        </div>
    );
};

export default AdminIndex;

export async function getServerSideProps(context) {
    const session = await getSession({req: context.req});

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
            session: session,
        }
    }
}