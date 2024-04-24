import ServiceDetailsForm from "@/components/admin/Services/ServiceDetailsForm";
import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import { getDatabase } from "@/db/mongoConnection";


export default function Index({ isEdit = false, service = {} }) {

    return (
        <SharedLayout>
            <Title title={isEdit ? 'Edit Service' : 'Add Sevice'} />
            <AdminPageTitle title={isEdit ? 'Edit Service' : 'Add Sevice'} />
            <div className="md:px-10 px-5 py-10">
                <ServiceDetailsForm service={service} isEdit={isEdit}/>
            </div>
        </SharedLayout>
    )
}


export async function getServerSideProps(context) {
    const { id } = context.query;
    let isEdit=false, service={};
    if (id[0] === 'edit')
    {
        isEdit = true;
        if (id.length === 1)
            return {
                redirect: {
                    destination: '/admin/services/services-details',
                    permanent: false
                }
            }

        const db = await getDatabase();
        service = await db.collection('services').findOne({slid:id[1]}, {projection:{_id:0}});
    }
    

    return {
        props: {
            isEdit, service
        }
    }
}