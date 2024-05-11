import CategoryHeader from "@/components/blog/CategoryHeader";
import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import { getDatabase } from "@/db/mongoConnection";

function Index({blogs, blogCategories}) {
    return (
        <SharedLayout>
            <Title title={'Blog'}/>
            <div className="px-10 pb-10 lg:ps-16 pt-7">
                <CategoryHeader categories={blogCategories}/>
            </div>
        </SharedLayout>
    );
}

export default Index;

export const getServerSideProps = async (ctx) => {
    const db = await getDatabase();
    const blogs = await db.collection('blogs').find({}).project({ _id: 0 }).toArray();
    const blogCategories = await db.collection('blogCategories').find({}).project({ _id: 0 }).toArray();

    return {
        props:{
            blogs, blogCategories
        }
    }
}