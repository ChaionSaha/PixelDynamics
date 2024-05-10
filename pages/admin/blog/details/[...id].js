import BlogDetailsForm from "@/components/admin/blogs/BlogDetailsForm";
import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import { getDatabase } from "@/db/mongoConnection";

const Index = ({blog, editState, blogCategories, authors}) => {
    return (
        <SharedLayout>
            <Title title={editState ? 'Edit Blog' : 'Add Blog'} />
            <AdminPageTitle title={editState ? 'Edit Blog' : 'Add Blog'} />
            <div className="md:px-10 px-5 py-10">
                <BlogDetailsForm blog={blog} editState={editState} blogCategories={blogCategories} authors={authors}/>
            </div>
        </SharedLayout>
    );
}

export default Index;

export const getServerSideProps = async (ctx) => {
    const { id } = ctx.query;
    
    if ((id[0] !== 'edit' && id[0] !== 'add') || (id[0] === 'edit' && id.length !== 2) || (id[0] === 'add' && id.length !== 1))
        return {
            redirect: {
                destination: '/admin/blog/details',
                permanent: false
            }
        }
    
    const db = await getDatabase();
    let blog = {};
    let blogCategories = await db.collection('blogCategories').find().project({ _id: 0 }).toArray();
    let authors=await db.collection('teamMembers').find().project({ _id: 0, name: 1, expertise: 1, img: 1, tid: 1}).toArray();
    if (id[0] === 'edit') {
        const bgid = id[1];
        blog = await db.collection('blogs').findOne({ bgid }, { projection: { _id: 0 } });
        if (!blog)
            return {
                redirect: {
                    destination: '/admin/blog/details',
                    permanent: false
                }
            }
    }
        

    return {
        props:{
            blog, editState: id[0] === 'edit', blogCategories, authors
        }
    }
}