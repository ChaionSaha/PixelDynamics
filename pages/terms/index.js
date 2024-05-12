import { getDatabase } from "@/db/mongoConnection";

function index() {
    return (
        <div>
            This is terms page
        </div>
    );
}

export default index;

export const getServerSideProps = async (ctx) => {
    const db = await getDatabase();
    const termsPages = await db.collection('terms').find().project({ _id: 0, tpid: 1, pageName: 1, pageLink: 1 }).toArray();
    const targetPage = termsPages[0];

    return {
        redirect: {
            destination: `/terms/${targetPage.pageLink}`,
        }
    }
}