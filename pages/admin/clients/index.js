import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import { getDatabase } from "@/db/mongoConnection";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";

const Index = ({ clients }) => {
    const [searchInput, setSearchInput] = useState('');
    const [tableData, setTableData] = useState(clients);
    
    useEffect(() => {
        if (searchInput.trim() === '')
            setTableData(clients);
        else {
            const temp = clients.filter(client => client.client.firstName.toLowerCase().includes(searchInput.toLowerCase()));
            setTableData(temp);
        }
    },[searchInput, clients])

    return (
        <SharedLayout>
            <Title title='Clients Lists' />
            <AdminPageTitle title='Clients Lists' />
            <Search setSearchInput={setSearchInput} />
            <div className="px-10">
                <Table tableData={tableData}/>
            </div>
        </SharedLayout>
    );
}

export default Index;

export const getServerSideProps = async (ctx) => {
    const db = await getDatabase();
    const clients = await db.collection('clients').find().project({ _id: 0 }).toArray();

    return {
        props:{
            clients
        }
    }
}

const Search = ({ setSearchInput }) => {
    return (
        <div className="flex md:flex-row flex-col gap-y-5 justify-between px-10 py-10">
            <div className="lg:w-[30%] md:w-[50%] w-full">
                <Input
                    type="text"
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
        </div>
    )
}

const Table = ({ tableData }) => {
    const router = useRouter();
    return (
        <div className="overflow-x-auto bg-admin-secondary p-5 mb-5">
            <table className="table table-zebra table-lg  rounded-none">
                <thead className='bg-admin-primary'>
                    <tr className='border-0'>
                        <th>SL.</th>
                        <th>Client Name</th>
                        <th>Client Email</th>
                        <th>Client Phone Number</th>
                        <th>Client WhatsApp Number</th>
                        <th>Selected Package</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData.map((c, i) => (
                            <tr key={i} className='border-0'>
                                <td>{i+1}</td>
                                <td>{c.client.firstName} {c.client.lastName}</td>
                                <td>{c.client.email}</td>
                                <td>
                                    <PhoneInput value={c.client.phone} specialLabel="" disabled={true} inputClass="bg-transparent"/>
                                </td>
                                <td>
                                    <PhoneInput value={c.client.whatsAppNumber} specialLabel="" disabled={true} inputClass="bg-transparent"/>
                                </td>
                                <td>{c.plan.name}</td>
                                <td>
                                    <button
                                        onClick={() => router.push(`/admin/clients/${c.clientId}`)}
                                        className="btn btn-sm btn-ghost">
                                        <i className="bi bi-file-text"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}