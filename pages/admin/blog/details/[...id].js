import BlogDetailsForm from "@/components/admin/blogs/BlogDetailsForm";
import AdminPageTitle from "@/components/Shared/AdminPageTitle";
import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import { getDatabase } from "@/db/mongoConnection";

const Index = ({blog, editState}) => {
    return (
        <SharedLayout>
            <Title title={editState ? 'Edit Blog' : 'Add Blog'} />
            <AdminPageTitle title={editState ? 'Edit Blog' : 'Add Blog'} />
            <div className="md:px-10 px-5 py-10">
                <BlogDetailsForm blog={blog} editState={editState}/>
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
    
    let blog = {};
    if (id[0] === 'edit') {
        const bcid = id[1];
        const db = await getDatabase();
        blog = await db.collection('blogs').findOne({ bcid });
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
            blog, editState: id[0] === 'edit'
        }
    }
}