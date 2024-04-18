import React, {useEffect, useMemo, useState} from 'react';
import Title from "@/components/Shared/title";
import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import {Button, Input, useDisclosure} from "@nextui-org/react";
import CustomTable from "@/components/Shared/CustomTable";
import SubCategoryModal from "@/components/admin/portfolio/SubCategoryModal";
import {getDatabase} from "@/db/mongoConnection";
import DeletCategoryModal from "@/components/admin/portfolio/DeletCategoryModal";
import axios from "axios";


const Index = ({mainCategories, subCategories}) => {
    const [searchInput, setSearchInput] = useState('');
    const [tableData, setTableData] = useState(subCategories);
    const [allData, setAllData] = useState(subCategories);
    const {onOpen, onOpenChange, isOpen} = useDisclosure();
    const {onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange, isOpen: isDeleteOpen} = useDisclosure();
    const [targetSubCat, setTargetSubCat] = useState({});
    const [editState, setEditState] = useState(false);
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);

    const columns = useMemo(() => {
        return [
            {
                name: "Sub Category Name",
                value: "name"
            },
            {
                name: "Main Category Name",
                value: "mainCatValue"
            }
        ]
    }, []);

    useEffect(() => {
        if (searchInput.trim() === '')
            setTableData(allData);
        else {
            let newTableData = allData.filter(ac => ac.name.toLowerCase().includes(searchInput.toLowerCase()));
            setTableData(newTableData);
        }
    }, [searchInput, allData]);

    useEffect(() => {
        setTableData(allData);
    }, [allData]);

    const actionOnEdit = (td) => {
        setEditState(true);
        setTargetSubCat(td);
        onOpen();
    };
    const actionOnDelete = (td) => {
        setTargetSubCat(td);
        onDeleteOpen();
    };

    const closeDeleteModal = async (onClose) => {
        axios.delete(`/api/admin/portfolio/add-edit-subcategory?id=${targetSubCat.scid}`).then(data => {
            setLoading(false);
            setAllData(data.data);
            onClose();
        }).catch(({response}) => {
            setErr(response?.data?.message);
            setLoading(false);
        })
    }

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
                    setEditState(false);
                    setTargetSubCat({});
                    onOpen();
                }} size='lg' radius="none" startContent={<i className='bi bi-plus'></i>}>
                    Add Category
                </Button>
                <SubCategoryModal isOpen={isOpen} onOpenChange={onOpenChange} value={targetSubCat} editState={editState}
                                  setEditState={setEditState} mainCat={mainCategories} setAllData={setAllData}/>
                <DeletCategoryModal onOpenChange={onDeleteOpenChange} isOpen={isDeleteOpen} name={targetSubCat.name}
                                    errorMessage={err} setErrorMessage={setErr} title={"Delete Sub Category"}
                                    loading={loading} closeModal={closeDeleteModal}/>
            </div>
            <div className="px-10">
                <CustomTable columns={columns} tableData={tableData} actionOnEdit={actionOnEdit}
                             actionOnDelete={actionOnDelete}/>
            </div>
        </div>
    );
};

export default Index;

export async function getServerSideProps() {
    const db = await getDatabase();
    const mainCategories = await db.collection('category').find().project({_id: 0}).toArray();
    const subCategories = await db.collection('subCategory').find().project({_id: 0}).toArray();

    return {
        props: {
            mainCategories, subCategories
        }
    }
}
