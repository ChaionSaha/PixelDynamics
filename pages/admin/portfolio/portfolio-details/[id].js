import React from 'react';
import Title from "@/components/Shared/title";
import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import SharedLayout from "@/components/Shared/SharedLayout";
import {getDatabase} from "@/db/mongoConnection";
import EditPortfolioForm from "@/components/admin/portfolio/EditPortfolioForm";

const PortfolioEdit = ({portfolio}) => {
    return (
        <SharedLayout>
            <Title title='Edit Portfolio'/>
            <AdminPageTitle title={'Edit Portfolio'}/>
            <div className="md:px-10 px-5 py-10">
                <EditPortfolioForm portfolio={portfolio}/>
            </div>

        </SharedLayout>
    );
};

export default PortfolioEdit;

export async function getServerSideProps(context) {
    const {id} = context.query;
    const db = await getDatabase();
    const portfolio = await db.collection('portfolio').findOne({pfid: id}, {projection: {_id: 0}});
    return {
        props: {
            portfolio
        }
    }
}