import React, {useState} from 'react';
import Title from "@/components/Shared/title";
import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import {Button, Input} from "@nextui-org/react";
import CustomTable from "@/components/Shared/CustomTable";

const columns = [
    {
        name: "Sub Category Name",
        value: "name"
    },
    {
        name: "Main Category Name",
        value: "mainCatName"
    }
]

const Index = () => {
    const [searchInput, setSearchInput] = useState('');
    const [tableData, setTableData] = useState([]);

    const actionOnEdit = () => {
    };
    const actionOnDelete = () => {
    };

    return (
        <div>
            <Title title='Portfolio Sub-Categories'/>
            <AdminPageTitle title={'Portfolio Sub-Categories'}/>

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
                <Button onPress={() => {

                    setInput('');
                    onOpen();
                }} size='lg' radius="none" startContent={<i className='bi bi-plus'></i>}>
                    Add Category
                </Button>

            </div>
            <div className="px-10">
                <CustomTable columns={columns} tableData={tableData} actionOnEdit={actionOnEdit}
                             actionOnDelete={actionOnDelete}/>
            </div>
        </div>
    );
};

export default Index;