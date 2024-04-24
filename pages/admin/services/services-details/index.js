import DeleteCategoryModal from "@/components/admin/portfolio/DeleteCategoryModal";
import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import AdminSearch from "@/components/Shared/AdminSearch";
import CustomTable from "@/components/Shared/CustomTable";
import SharedLayout from '@/components/Shared/SharedLayout';
import Title from "@/components/Shared/title";
import { getDatabase } from "@/db/mongoConnection";
import { useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const columns = [
    {
        name: 'Title',
        value: 'title'
    },
]


export default function Index({services=[]}) {
    const [searchInput, setSearchInput] = useState('');
    const [targetService, setTargetService] = useState({});
    const [loading, setLoading] = useState(false);
    const [err, setErr]=useState('')
    const { onOpen, onOpenChange, isOpen } = useDisclosure();
    const router = useRouter();
    
    useEffect(() => {
        if (searchInput.trim() === '')
            setTableData(services);
        else
        {
            let tempData = services.filter((s) => s.title.toLowerCase().includes(searchInput.toLowerCase()));
            setTableData(tempData);
        }
    },[searchInput, services])


    const [tableData, setTableData] = useState(services);

    const handleEditService = (service) => {
        router.push(`/admin/services/services-details/edit/${service.slid}`);
    }

    const handleDeleteService = (service) => {
        setTargetService(service);
        onOpen();
    }

    const handleCloseModal = async (onClose) => {
        setLoading(true);
        setErr('')
        axios.delete(`/api/admin/services/add-edit-service?slid=${targetService.slid}`)
            .then(res => setTableData(res.data))
            .catch(({ response }) => setErr(response?.data?.message))
            .finally(() => {setLoading(false); setErr('')});
        onClose();
    }

    return (
        <SharedLayout>
            <Title title='Services'/>
            <AdminPageTitle title={'Services'}/>
            <AdminSearch setSearchInput={setSearchInput} addBtnName={'Add Service'} addBtnFnc={()=>router.push('/admin/services/services-details/add')}/>
            <div className="px-10">
                <CustomTable tableData={tableData} columns={columns} actionOnEdit={handleEditService}
                    actionOnDelete={handleDeleteService}/>
            </div>
            <DeleteCategoryModal isOpen={isOpen}
                onOpenChange={onOpenChange}
                closeModal={handleCloseModal}
                title={'Delete Service'}
                name={targetService.title}
                loading={loading}
                errorMessage={err}
                setErrorMessage={setErr}
            />
        </SharedLayout>
    )
}


export async function getServerSideProps() {
    const db = await getDatabase();
    const services = await db.collection('services').find().project({_id: 0}).toArray();

    return {
        props: {
            services
        }
    }
}