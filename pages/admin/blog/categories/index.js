import CategoryModal from "@/components/admin/portfolio/CategoryModal";
import DeleteCategoryModal from "@/components/admin/portfolio/DeleteCategoryModal";
import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import CustomTable from "@/components/Shared/CustomTable";
import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import { getDatabase } from "@/db/mongoConnection";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

const columns = [
    {
        name: "Category Name",
        value: "name"
    },
]

function Index({blogCategories}) {
    const [editState, setEditState] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [tableData, setTableData] = useState(blogCategories);
    const [loadingData, setLoadingData] = useState(false);
    const [err, setErr] = useState('');
    const [input, setInput] = useState('');
    const { isOpen, onOpenChange, onOpen } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpenChange: onDeleteOpenChange, onOpen: onDeleteOpen } = useDisclosure();
    const [targetCat, setTargetCat] = useState({});

    useEffect(() => {
        if (searchInput.trim() === '')
            setTableData(blogCategories);
        else
            setTableData(blogCategories.filter((cat) => cat.name.toLowerCase().includes(searchInput.toLowerCase())));

    },[searchInput, blogCategories])

    const closeModal = async (onClose) => {
        setLoadingData(true);
        axios.post('/api/admin/blog/add-edit-category', {
            name: input,
            bcid: targetCat?.bcid,
            isEdit: editState
        }).then((data) => {
            setTableData(data.data);
            onClose();
        }).catch(err=>{
            setErr(err?.response?.data?.message);
        }).finally(()=>setLoadingData(false))
    }
    const closeDeleteModal = async (onClose) => {
        setLoadingData(true);
        axios.delete(`/api/admin/blog/add-edit-category?bcid=${targetCat.bcid}`)
            .then((data) => {
                setTableData(data.data);
                onClose();
            })
            .catch(err => {
                setErr(err?.response?.data?.message);
            }).finally(()=>setLoadingData(false))
    }
    
    const actionOnEdit = (targetCat) => {
        setEditState(true);
        setTargetCat(targetCat);
        setInput(targetCat.name);
        onOpen();
    }
    const actionOnDelete = (targetCat) => {
        setTargetCat(targetCat);
        onDeleteOpen();
    }

    return (
        <SharedLayout>
            <Title title={'Blog Categories'} />
            <AdminPageTitle title="Blog Categories" />
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
                <Button
                    onPress={() => {
                        setEditState(false);
                        setInput('');
                        onOpen();
                    }}
                    size='lg'
                    radius="none"
                    startContent={<i className='bi bi-plus'></i>}>
                        Add Category
                </Button>
                <CategoryModal isOpen={isOpen} onOpenChange={onOpenChange} closeModal={closeModal}
                    setInput={setInput} loading={loadingData} errorMessage={err}
                    setErrorMessage={setErr} editState={editState} value={input}
                />
                <DeleteCategoryModal isOpen={isDeleteOpen} onOpenChange={onDeleteOpenChange}
                    closeModal={closeDeleteModal} title='Delete Category' setErrorMessage={setErr}
                    errorMessage={err} loading={loadingData} name={targetCat.name}/>
            </div>
            <div className="px-10">
                <CustomTable columns={columns} tableData={tableData} actionOnEdit={actionOnEdit}
                    actionOnDelete={actionOnDelete}/>
            </div>
        </SharedLayout>
    );
}

export default Index;

export async function getServerSideProps() {
    const db = await getDatabase();
    const blogCategories = await db.collection("blogCategories").find().project({_id: 0}).toArray();
    return {
        props: {
            blogCategories
        }
    }
}