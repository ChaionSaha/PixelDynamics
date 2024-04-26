import SubscriptionPlanForm from "@/components/admin/Services/SubscriptionPlanForm";
import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import Title from "@/components/Shared/title";
import { getDatabase } from "@/db/mongoConnection";

export default function AddEditPlan({ plan, isEdit }) {
    
    return (
        <div>
            <Title title={isEdit ? 'Edit Plan' : 'Add Plan'} />
            <AdminPageTitle title={isEdit ? 'Edit Plan' : 'Add Plan'} />
            <div className="md:px-10 px-5 py-10">
                <SubscriptionPlanForm plan={plan} isEdit={isEdit} />
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    let plan = {};

    if (id[0] !== 'add' && id[0] !== 'edit')
        return {
            redirect: {
                destination: '/admin/services/subscriptions',
                permanent:false
            }
        }
    
    if (id[0] !== 'edit')
        return {
            props: {
                plan, isEdit:false
            }
        }
    
    if (id[1] === 'edit' && id.length !== 2)
        return {
            redirect: {
                destination:'/admin/services/subscriptions',
            }
        }
    
    const spid = id[1];
    const db = await getDatabase();
    plan = await db.collection('subscriptionPlans').findOne({ spid }, {projection:{_id:0}});
    
    if (!plan)
        return {
            redirect: {
                destination: '/admin/services/subscriptions',
                permenant: false
            }
        }

    return {
        props: {
            plan, isEdit:true
        }
    }
}