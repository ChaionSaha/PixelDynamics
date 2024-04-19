import React, {useState} from 'react';
import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import {Button, Input} from "@nextui-org/react";
import {useRouter} from "next/router";

const Index = () => {
    const [searchInput, setSearchInput] = useState('');
    const router = useRouter();
    return (
        <SharedLayout>
            <Title title='Portfolio Details'/>
            <AdminPageTitle title={'Portfolio Details'}/>
            <div className="flex md:flex-row flex-col gap-y-5 justify-between px-10 py-10">
                <div className="lg:w-[30%] md:w-[50%] w-full">
                    <Input
                        type="email"
                        placeholder="Search"
                        startContent={
                            <i className='bi bi-search'></i>
                        }
                        variant='bordered'
                        size="lg"
                        classNames={{
                            inputWrapper: 'rounded-none border',
                        }}
                        onValueChange={setSearchInput}
                    />
                </div>
                <Button onClick={() => router.push('/admin/portfolio/portfolio-details/add-portfolio')} size='lg'
                        radius="none" startContent={<i className='bi bi-plus'></i>}>
                    Add Portfolio
                </Button>
            </div>
        </SharedLayout>
    );
};

export default Index;