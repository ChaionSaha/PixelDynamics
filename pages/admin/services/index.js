import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import BoxContainer from "@/components/Shared/BoxContainer";
import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import { getDatabase } from "@/db/mongoConnection";

const AdminService = ({services, subscriptions}) => {
    return (
        <SharedLayout>
            <div>
                <Title title="Services"/>
                <AdminPageTitle title="Services"/>
                <div className="grid gap-10 px-10 py-10 lg:grid-cols-4 md:grid-cols-2">
                    <BoxContainer ptext="Services" number={services} link='/admin/services/services-details'/>
                    <BoxContainer ptext="Subscription Plans" number={subscriptions}
                        link='/admin/services/subscriptions'/>
                </div>
            </div>
        </SharedLayout>
    );
};

export default AdminService;

export async function getServerSideProps() {
    const db = await getDatabase();
    const services = await db.collection("services").countDocuments();
    const subscriptions = await db
        .collection("subscriptionPlans")
        .countDocuments();

    return {
        props: {
            services,
            subscriptions,
        },
    };
}
