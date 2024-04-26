import DeleteCategoryModal from "@/components/admin/portfolio/DeleteCategoryModal";
import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import AdminSearch from "@/components/Shared/AdminSearch";
import CustomTable from "@/components/Shared/CustomTable";
import SharedLayout from "@/components/Shared/SharedLayout";
import Title from '@/components/Shared/title';
import { getDatabase } from "@/db/mongoConnection";
import { useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const columns = [
    {
        name: "Plan Name",
        value:"name"
    },
    {
        name: "Price",
        value:"price"
    }
]


const Index = ({plans}) => {
    const [searchInput, setSearchInput] = useState('');
    const router = useRouter();
    const [targetPlan, setTargetPlan] = useState({});
    const { onOpen, onOpenChange, isOpen } = useDisclosure();
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState(plans);

    useEffect(() => {
        if (searchInput.trim() === '')
            setTableData(plans);

        else {
            const temp = plans.filter(plan => plan.name.toLowerCase().includes(searchInput.toLowerCase()));
            setTableData(temp);
        }
    },[searchInput, plans])

    const handleEditPlan = (plan) => {
        router.push(`/admin/services/subscriptions/edit/${plan.spid}`);
    }
    
    const handleDeletePlan = (plan) => {
        setTargetPlan(plan);
        onOpen();
    }


    const handleCloseModal = async (onClose) => {
        setLoading(true);
        setErr('');
        axios.delete(`/api/admin/services/add-edit-plan?spid=${targetPlan.spid}`)
            .then(res => {
                setTableData(res.data);
                onClose()
            })
            .catch(({ response }) => setErr(response?.data?.message))
            .finally(() => { setLoading(false) });
    }

    return (
        <SharedLayout>
            <Title title={'Subscriptions Plans'} />
            <AdminPageTitle title="Subscriptions Plans" />
            <AdminSearch setSearchInput={setSearchInput} addBtnName={'Add Plan'} addBtnFnc={() => router.push('/admin/services/subscriptions/add')} />
            <div className="px-10">
                <CustomTable tableData={tableData} columns={columns} actionOnEdit={handleEditPlan} actionOnDelete={handleDeletePlan}/>
            </div>
            <DeleteCategoryModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                title={'Delete Plan'}
                name={targetPlan.name}
                errorMessage={err}
                setErrorMessage={setErr}
                loading={loading}
                closeModal={handleCloseModal}
            />
            
        </SharedLayout>
    );
};

export default Index;

export async function getServerSideProps() {
    const db = await getDatabase();
    const plans = await db.collection('subscriptionPlans').find().project({ _id: 0 }).toArray();
    
    return {
        props: {
            plans
        }
    }
}