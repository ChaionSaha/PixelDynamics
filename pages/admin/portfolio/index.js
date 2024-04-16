import React from 'react';
import Title from "@/components/Shared/title";
import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import {useRouter} from "next/router";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {getDatabase} from "@/db/mongoConnection";

const AdminPortfolio = ({portfolios, categories, subCategories}) => {
    return (
        <div>
            <Title title='Portfolio'/>
            <AdminPageTitle title='Portfolio'/>
            <div className="grid gap-10 px-10 py-10 md:grid-cols-3 grid-cols-2">
                <BoxContainer link='/admin/portfolio/portfolio-details'>
                    {portfolios}
                    <p className='lg:text-lg text-base '>Portfolios</p>
                </BoxContainer>

                <BoxContainer link='/admin/portfolio/categories'>
                    {categories}
                    <p className='lg:text-lg text-base '>Categories</p>
                </BoxContainer>

                <BoxContainer link='/admin/portfolio/sub-categories'>
                    {subCategories}
                    <p className='lg:text-lg text-base'>Sub Categories</p>
                </BoxContainer>


            </div>
        </div>
    );
};

export default AdminPortfolio;

const BoxContainer = ({children, link}) => {
    const router = useRouter();
    return <div onClick={() => router.push(link)}
                className="lg:py-16 py-10  cursor-pointer flex flex-col justify-center items-center text-center text-4xl lg:text-6xl font-semibold
        rounded-lg bg-admin-secondary hover:shadow-xl hover:translate-y-[-2%] hover:scale-[1.01] duration-300 border border-transparent hover:border-base-300">
        {children}
    </div>
}


export async function getServerSideProps({req, res}) {
    let portfolios = 0, categories = 0, subCategories = 0;
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return {
            props: {portfolios, categories, subCategories}
        }
    }

    const db = await getDatabase();
    portfolios = await db.collection('portfolio').countDocuments();
    categories = await db.collection('category').countDocuments();
    subCategories = await db.collection('subCategory').countDocuments();


    return {
        props: {portfolios, categories, subCategories}
    }

}