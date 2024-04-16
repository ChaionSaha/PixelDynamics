import React from 'react';
import Title from "@/components/Shared/title";
import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import {useRouter} from "next/router";

const AdminPortfolio = () => {
    return (
        <div>
            <Title title='Portfolio'/>
            <AdminPageTitle title='Portfolio'/>
            <div class="grid gap-10 px-10 py-10 md:grid-cols-3 grid-cols-2">
                <BoxContainer link='/admin/portfolio/portfolio-details'>
                    10
                    <p class='lg:text-lg text-base'>Portfolios</p>
                </BoxContainer>

                <BoxContainer link='/admin/portfolio/categories'>
                    10
                    <p class='lg:text-lg text-base'>Categories</p>
                </BoxContainer>

                <BoxContainer link='/admin/portfolio/sub-categories'>
                    10
                    <p class='lg:text-lg text-base'>Sub Categories</p>
                </BoxContainer>
            </div>
        </div>
    );
};

export default AdminPortfolio;

const BoxContainer = ({children, link}) => {
    const router = useRouter();
    return <div onClick={() => router.push(link)}
                class="lg:py-16 py-10 cursor-pointer flex flex-col justify-center items-center text-center text-4xl lg:text-6xl font-semibold
        rounded-lg bg-admin-secondary">
        {children}
    </div>
}
