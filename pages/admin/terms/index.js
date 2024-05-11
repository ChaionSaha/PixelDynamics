import DeleteCategoryModal from "@/components/admin/portfolio/DeleteCategoryModal";
import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import AdminSearch from "@/components/Shared/AdminSearch";
import CustomTable from "@/components/Shared/CustomTable";
import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import { useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";

const columns = [
    {
        name: "Page Name",
        value: "name"
    },
    {
        name: "Page Title",
        value: "title"
    }
]

const Index = () => {
    const [searchInput, setSearchInput] = useState('');
    const router = useRouter();
    const [tableData, setTableData] = useState([]);
    const { isOpen, onOpenChange, onOpen } = useDisclosure();
    const [targetPage, setTargetPage] = useState({});
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEditPage = () => { }
    const handleDeletePage = () => { }
    
    const handleCloseModal = (onClose) => {
        onClose();
    }

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
                title={'Delete Team Member'}
                name={targetPage?.name}
                errorMessage={err}
                setErrorMessage={setErr}
                loading={loading}
            />
        </SharedLayout>
    );
}

export default Index;