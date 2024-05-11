import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import { getDatabase } from "@/db/mongoConnection";
import { useRouter } from "next/router";

const Index = ({ blog }) => {
    const router = useRouter();

    return (
        <SharedLayout>
            <Title title={`${blog.name} - Blog`}/>
            <div>
                <div class="flex lg:text-3xl text-2xl items-start gap-x-5 lg:ps-10 ps-16 lg:px-10 px-2 py-7 font-bold">
                    <button onClick={() => {
                        router.push('/portfolio');
                    }}><i class='bi bi-chevron-left text-2xl'></i></button>
                    <p>{blog.name}</p>
                </div>
            </div>
        </SharedLayout>
    );
}

export default Index;

export const getServerSideProps = async (ctx) => {
    const { query } = ctx;
    let bgid = query.id;
    const db = await getDatabase();
    const blog = await db.collection('blogs').findOne({bgid}, {projection:{_id:0}});

    return {
        props:{
            blog
        }
    }
}