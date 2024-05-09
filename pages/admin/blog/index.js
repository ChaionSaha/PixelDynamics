import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import BoxContainer from "@/components/Shared/BoxContainer";
import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import { getDatabase } from "@/db/mongoConnection";

function index({blogs, blogCategories}) {
    return (
        <SharedLayout>
            <div>
                <Title title="Blogs" />
                <AdminPageTitle title="Blog" />
                <div className="grid gap-10 px-10 py-10 lg:grid-cols-4 md:grid-cols-2">
                    <BoxContainer
                        link="/admin/blog/details"
                        number={blogs}
                        ptext={"Blogs"}
                    />
                    <BoxContainer
                        link="/admin/blog/categories"
                        number={blogCategories}
                        ptext={"Blog Categories"}
                    />
                </div>
            </div>
        </SharedLayout>
    );
}

export default index;

export async function getServerSideProps() {
    const db = await getDatabase();
    const blogs = await db.collection("blogs").countDocuments();
    const blogCategories = await db.collection("blogCategories").countDocuments();
    
    return {
        props: {
            blogs, blogCategories
        }
    }
}