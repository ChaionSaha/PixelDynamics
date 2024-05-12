import TermsDetailsForm from "@/components/admin/terms/TermsDetailsForm";
import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import { getDatabase } from "@/db/mongoConnection";

const Index = ({isEdit, termsPage}) => {
    return (
        <SharedLayout>
            <Title title={isEdit ? 'Edit Page' : 'Add page'}/>
            <AdminPageTitle title={isEdit ? 'Edit Page' : 'Add page'} />
            <div className="md:px-10 px-5 py-10">
                <TermsDetailsForm page={termsPage} editState={isEdit}/>
            </div>
        </SharedLayout>
    );
}

export default Index;

export async function getServerSideProps(context) {
    const { id } = context.query;
    let termsPage={}

    if (id[0] !== 'add' && id[0] !== 'edit')
        return {
            redirect: {
                destination: '/admin/terms',
                permanent:false
            }
        }

    if (id[0] === 'add')
        return {
            props:
            {
                termsPage:{}, isEdit:false
            }
        }
    
    if (id[0] === 'edit' && id.length !== 2)
        return {
            redirect: {
                destination: '/admin/terms',
            }
        }
    
    
    const tpid = id[1];
    const db = await getDatabase();
    termsPage = await db.collection('terms').findOne({ tpid }, { projection: { _id: 0 } });

    if (!termsPage)
        return {
            redirect: {
                destination: 'admin/terms',
                permanent: false
            }
            
        }
        
    return {
        props: {
            termsPage, isEdit:true
        }
    }
}