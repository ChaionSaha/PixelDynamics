import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import BoxContainer from "@/components/Shared/BoxContainer";
import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import { getDatabase } from "@/db/mongoConnection";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const AdminPortfolio = ({ portfolios, categories, subCategories }) => {
    return (
        <SharedLayout>
            <div>
                <Title title="Portfolio" />
                <AdminPageTitle title="Portfolio" />
                <div className="grid gap-10 px-10 py-10 lg:grid-cols-4 md:grid-cols-2">
                    <BoxContainer
                        link="/admin/portfolio/portfolio-details"
                        number={portfolios}
                        ptext={"Portfolios"}
                    />
                    <BoxContainer
                        link="/admin/portfolio/categories"
                        number={categories}
                        ptext={"Categories"}
                    />
                    <BoxContainer
                        link="/admin/portfolio/sub-categories"
                        number={subCategories}
                        ptext={"Sub Categories"}
                    />
                </div>
            </div>
        </SharedLayout>
    );
};

export default AdminPortfolio;

export async function getServerSideProps({ req, res }) {
    let portfolios = 0,
        categories = 0,
        subCategories = 0;
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return {
            props: { portfolios, categories, subCategories },
        };
    }

    const db = await getDatabase();
    portfolios = await db.collection("portfolio").countDocuments();
    categories = await db.collection("category").countDocuments();
    subCategories = await db.collection("subCategory").countDocuments();

    return {
        props: { portfolios, categories, subCategories },
    };
}
