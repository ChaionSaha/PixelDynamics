import React from 'react';
import Title from "@/components/Shared/title";
import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import SharedLayout from "@/components/Shared/SharedLayout";
import AddPortfolioForm from "@/components/admin/portfolio/AddPortfolioForm";

const Index = () => {
    return (
        <SharedLayout>
            <Title title='Add Portfolio'/>
            <AdminPageTitle title={'Add Portfolio'}/>
            <div className="md:px-10 px-5 py-10">
                <AddPortfolioForm/>
            </div>
        </SharedLayout>
    );
};

export default Index;