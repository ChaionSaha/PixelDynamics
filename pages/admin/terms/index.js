import DeleteCategoryModal from "@/components/admin/portfolio/DeleteCategoryModal";
import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import AdminSearch from "@/components/Shared/AdminSearch";
import CustomTable from "@/components/Shared/CustomTable";
import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import { getDatabase } from "@/db/mongoConnection";
import { useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const columns = [
    {
        name: "Page Name",
        value: "pageName"
    }
]

const Index = ({terms}) => {
    const [searchInput, setSearchInput] = useState('');
    const router = useRouter();
    const [tableData, setTableData] = useState(terms);
    const { isOpen, onOpenChange, onOpen } = useDisclosure();
    const [targetPage, setTargetPage] = useState({});
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEditPage = (targetPage) => {
        router.push(`/admin/terms/edit/${targetPage.tpid}`);
    }
    const handleDeletePage = (targetPage) => {
        setTargetPage(targetPage);
        onOpen();
    }
    
    const handleCloseModal = (onClose) => {
        axios.delete(`/api/admin/terms/add-edit-terms-page?tpid=${targetPage.tpid}`)
            .then((data) => {
                setTableData(data.data);
                onClose();
            })
            .catch(err => setErr(err?.response?.data?.message))
            .finally(()=>setLoading(false))
    }

    useEffect(() => {
        if (searchInput.trim() === '')
            setTableData(terms);

        else 
            setTableData(terms.filter(term => term.pageName.toLowerCase().includes(searchInput.toLowerCase())))
    },[searchInput, terms])

    return (
        <SharedLayout>
            <Title title={'Terms & Policy Pages'} />
            <AdminPageTitle title="Terms & Policy Pages" />
            <AdminSearch setSearchInput={setSearchInput} addBtnName={'Add Page'} addBtnFnc={()=>router.push('/admin/terms/add')}/>
            <div className="px-10">
                <CustomTable
                    tableData={tableData}
                    columns={columns}
                    actionOnEdit={handleEditPage}
                    actionOnDelete={handleDeletePage}
                />
            </div>
            <DeleteCategoryModal
                onOpenChange={onOpenChange}
                isOpen={isOpen}
                closeModal={handleCloseModal}
                title={'Delete Page'}
                name={targetPage?.pageName}
                errorMessage={err}
                setErrorMessage={setErr}
                loading={loading}
            />
        </SharedLayout>
    );
}

export default Index;

export const getServerSideProps = async (ctx) => {
    const db = await getDatabase();
    const terms = await db.collection('terms').find().project({ _id: 0 }).toArray();
    return {
        props:{
            terms
        }
    }
}