import DeleteCategoryModal from "@/components/admin/portfolio/DeleteCategoryModal";
import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import CustomTable from "@/components/Shared/CustomTable";
import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import { getDatabase } from "@/db/mongoConnection";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const columns = [
    {
        name: "Title",
        value: "title"
    },
    {
        name: "Author",
        value: "author.name"
    },
    {
        name: "Category",
        value: "category"
    }
]

function Index({blogs}) {
    const [searchInput, setSearchInput] = useState('');
    const [tableData, setTableData] = useState(blogs);
    const [loadingData, setLoadingData] = useState(false);
    const [err, setErr] = useState('');
    const { isOpen: isDeleteOpen, onOpenChange: onDeleteOpenChange, onOpen: onDeleteOpen } = useDisclosure();
    const [targetCat, setTargetCat] = useState({});
    const router = useRouter();

    
    const closeDeleteModal = async (onClose) => {
        setLoadingData(true);
        
    }
    
    const actionOnEdit = (targetCat) => {
        
    }
    const actionOnDelete = (targetCat) => {
        setTargetCat(targetCat);
        onDeleteOpen();
    }

    useEffect(() => {
        if (searchInput.trim() === '')
            setTableData(blogs);
        else
            setTableData(blogs.filter((cat) => cat.name.toLowerCase().includes(searchInput.toLowerCase())));

    },[searchInput, blogs])

    return (
        <SharedLayout>
            <Title title={'Blogs'} />
            <AdminPageTitle title="Blogs" />
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
                        router.push('/admin/blog/details/add');
                    }}
                    size='lg'
                    radius="none"
                    startContent={<i className='bi bi-plus'></i>}>
                        Add Blog
                </Button>
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

export const getServerSideProps = async () => {
    const db = await getDatabase();
    const blogs = await db.collection('blogs').find({}).project({_id: 0}).toArray();

    return {
        props:{
            blogs
        }
    }
}