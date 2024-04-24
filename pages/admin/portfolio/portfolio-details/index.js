
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
import { useEffect, useState } from 'react';

const columns = [
    {
        name: "Portfolio Name",
        value: "name"
    },
    {
        name: "Portfolio Position",
        value: "position"
    },
    {
        name: "Main Category",
        value: "mainCat",
    },
    {
        name: "Sub Category",
        value: "subCat"
    }
]

const Index = ({portfolios}) => {
    const [searchInput, setSearchInput] = useState('');
    const router = useRouter();
    const [tableData, setTableData] = useState(portfolios);
    const [allData, setAllData] = useState(portfolios)
    const [targetPf, setTargetPf] = useState({});
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');
    const {isOpen, onOpenChange, onOpen} = useDisclosure()

    useEffect(() => {
        if (searchInput.trim() === '')
            setTableData(allData);
        else {
            let newTableData = allData.filter(ac => ac.name.toLowerCase().includes(searchInput.toLowerCase()));
            setTableData(newTableData);
        }
    }, [searchInput, allData]);

    function handleEditPortfolio({pfid}) {
        router.push(`/admin/portfolio/portfolio-details/${pfid}`);
    }

    function handleDeletePortfolio(pf) {
        setTargetPf(pf);
        onOpen();
    }

    async function handleCloseModal(onClose) {
        setLoading(true);
        setErr('');
        axios.delete(`/api/admin/portfolio/add-edit-portfolio?id=${targetPf.pfid}`).then((data) => {
            setAllData(data.data);
        }).catch(({response}) => setErr(response?.data?.data)).finally(() => {
            setLoading(false);
        })

        onClose();
    }


    return (
        <SharedLayout>
            <Title title='Portfolio Details'/>
            <AdminPageTitle title={'Portfolio Details'}/>
            <AdminSearch setSearchInput={setSearchInput} addBtnName='Add Portfolio'
                addBtnFnc={() => router.push('/admin/portfolio/portfolio-details/add-portfolio')}/>
            <div className="px-10">
                <CustomTable tableData={tableData} columns={columns} actionOnEdit={handleEditPortfolio}
                    actionOnDelete={handleDeletePortfolio}/>
            </div>
            <DeleteCategoryModal name={targetPf.name} title={'Delete Portfolio'}
                loading={loading} setErrorMessage={setErr} isOpen={isOpen} onOpenChange={onOpenChange}
                closeModal={handleCloseModal} errorMessage={err}/>
        </SharedLayout>
    );
};

export default Index;

export async function getServerSideProps({req, res}) {
    const db = await getDatabase();
    const portfolios = await db.collection('portfolio').find().project({_id: 0}).toArray();

    return {
        props: {
            portfolios
        }
    }
}