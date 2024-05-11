import BlogCard from "@/components/blog/BlogCard";
import CategoryHeader from "@/components/blog/CategoryHeader";
import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import { getDatabase } from "@/db/mongoConnection";
import Link from "next/link";
import { useState } from "react";

function Index({ blogs, blogCategories }) {
    const [displayedBlogs, setDisplayedBlogs] = useState(blogs);
    return (
        <SharedLayout>
            <Title title={'Blog'}/>
            <div className="px-10 pb-10 lg:ps-16 pt-7">
                <CategoryHeader categories={blogCategories} setBlogs={setDisplayedBlogs} blogs={blogs}/>
                <div className="mt-10 grid lg:grid-cols-3 md:grid-cols-2 gap-10">
                    {
                        displayedBlogs.map((b, i) => <Link key={i} href={`/blog/${b.bgid}`}>
                            <BlogCard blog={b} blogCategories={blogCategories } />
                        </Link>)
                    }
                </div>
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

