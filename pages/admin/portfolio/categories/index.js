import React, {useEffect, useState} from 'react';
import Title from "@/components/Shared/title";
import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import {Button, Input, useDisclosure} from "@nextui-org/react";
import CategoryModal from "@/components/admin/portfolio/CategoryModal";
import axios from "axios";
import {getDatabase} from "@/db/mongoConnection";
import CustomTable from "@/components/Shared/CustomTable";
import DeletCategoryModal from "@/components/admin/portfolio/DeletCategoryModal";

const columns = [
    {
        name: "Category Name",
        value: "name"
    },
]

const Index = ({categories = []}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange} = useDisclosure();

    const [input, setInput] = useState('');
    const [loadingData, setLoadingData] = useState(false);
    const [err, setErr] = useState('');
    const [tableData, setTableData] = useState([]);
    const [editState, setEditState] = useState(false);
    const [targetCat, setTargetCat] = useState({});
    const [searchInput, setSearchInput] = useState('');
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        setTableData(categories);
        setAllCategories(categories);
    }, [categories]);

    useEffect(() => {
        if (searchInput.trim() === '')
            setTableData(allCategories);
        else {
            let newTableData = allCategories.filter(ac => ac.name.toLowerCase().includes(searchInput.toLowerCase()));
            setTableData(newTableData);
        }
    }, [searchInput, allCategories]);

    const closeModal = (onClose) => {
        setLoadingData(true);
        setErr('')
        if (!editState) {
            axios.post('/api/admin/portfolio/add-new-category', {category: input}).then((data) => {
                setTableData(data.data);
                setAllCategories(data.data);
                setLoadingData(false);
                onClose();
            }).catch(({response}) => {
                setLoadingData(false);
                setErr(response.data.message);
            })
        } else {
            axios.post('/api/admin/portfolio/edit-category', {
                id: targetCat.cid,
                updateCategory: input
            }).then((data) => {
                setTableData(data.data);
                setAllCategories(data.data);
                setLoadingData(false);
                onClose();
                setEditState(false);
            }).catch(({response}) => {
                setLoadingData(false);
                setErr(response.data.message);
                setEditState(false);
            })
        }
    }

    const closeDeleteModal = (onClose) => {
        setLoadingData(true);
        setErr('');
        axios.delete(`/api/admin/portfolio/delete-category?id=${targetCat.cid}`).then((data) => {
            setTableData(data.data);
            setAllCategories(data.data);
            setLoadingData(false);
            onClose();
        }).catch(({response}) => {
            setLoadingData(false);
            setErr(response.data.message);
        })
    }

    const actionOnEdit = (cat) => {
        setEditState(true);
        setTargetCat(cat);
        setInput(cat.name);
        onOpen();
    }

    const actionOnDelete = (cat) => {
        setTargetCat(cat);
        onDeleteOpen();
    }

    return (
        <div>
            <Title title='Portfolio Categories'/>
            <AdminPageTitle title={'Portfolio Categories'}/>
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
                    setInput('');
                    onOpen();
                }} size='lg' radius="none" startContent={<i className='bi bi-plus'></i>}>
                    Add Category
                </Button>
                <CategoryModal isOpen={isOpen} onOpenChange={onOpenChange} closeModal={closeModal}
                               title={'Add Category'} setInput={setInput} loading={loadingData} errorMessage={err}
                               setErrorMessage={setErr} editState={editState} value={input}
                />
                <DeletCategoryModal isOpen={isDeleteOpen} onOpenChange={onDeleteOpenChange}
                                    closeModal={closeDeleteModal} title='Delete Category' setErrorMessage={setErr}
                                    errorMessage={err} loading={loadingData} catDetails={targetCat}/>
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
    const categories = await db.collection('category').find().project({_id: 0}).toArray();

    return {
        props: {
            categories
        }
    }
}
