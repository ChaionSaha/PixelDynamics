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
import { useState } from "react";

const columns = [
    {
        name: "Name",
        value:"name"
    },
    {
        name: "Expertise",
        value:"expertise"
    },
    {
        name: "Featured",
        value:"featured"
    }
]

const AdminTeam = ({teamMembers=[]}) => {
    const [searchInput, setSearchInput] = useState('');
    const [tableData, setTableData] = useState(teamMembers);
    const [targetMember, setTargetMember] = useState({});
    const router = useRouter();
    const { isOpen, onOpenChange, onOpen } = useDisclosure();
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEditTeamMember = (teamMember) => {
        router.push(`/admin/team/edit/${teamMember.tid}`);
    }

    const handleDelete = (teamMember) => {
        setTargetMember(teamMember);
        onOpen();
    }

    const handleCloseModal = async (onClose) => {
        setLoading(true);
        setErr('');

        axios.delete(`/api/admin/team/member-add-edit?tid=${targetMember.tid}`)
            .then(res => { setTableData(res.data); onClose();})
            .catch(({ response }) => setErr(response?.data?.message))
            .finally(() => setLoading(false));

        
    }

    return (
        <SharedLayout>
            <Title title='Team' />
            <AdminPageTitle title="Team Members" />
            <AdminSearch setSearchInput={setSearchInput} addBtnName={'Add Team Member'} addBtnFnc={()=>router.push('/admin/team/add')}/>
            <div className="px-10">
                <CustomTable
                    tableData={tableData}
                    columns={columns}
                    actionOnEdit={handleEditTeamMember}
                    actionOnDelete={handleDelete}
                />
            </div>
            <DeleteCategoryModal
                onOpenChange={onOpenChange}
                isOpen={isOpen}
                closeModal={handleCloseModal}
                title={'Delete Team Member'}
                name={targetMember?.name}
                errorMessage={err}
                setErrorMessage={setErr}
                loading={loading}
            />
        </SharedLayout>
    );
};

export default AdminTeam;

export async function getServerSideProps() {
    const db = await getDatabase();
    const teamMembers = await db.collection('teamMembers').find().project({ _id: 0 }).toArray();
    return {
        props: {
            teamMembers
        }
    }

}