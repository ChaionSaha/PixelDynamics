import { ChevronLeftIcon } from "@/assets/CustomIcons/CustomIcon";
import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import { getDatabase } from "@/db/mongoConnection";
import Image from "next/image";
import { useRouter } from "next/router";
import YouTube from "react-youtube";

const Index = ({ blog }) => {
    const router = useRouter();

    return (
        <SharedLayout>
            <Title title={`${blog.name} - Blog`}/>
            <div>
                <div className="flex lg:text-3xl laptop:text-2xl text-2xl items-center gap-x-5 lg:ps-10 ps-16 lg:px-10 px-2 py-7 font-bold">
                    <button onClick={() => {
                        router.push('/blog');
                    }}>
                        <ChevronLeftIcon className='size-5 laptop:size-4'/>
                    </button>
                    <p>{blog.name}</p>
                </div>
                <div className="flex flex-col gap-x-20 lg:flex-row lg:ps-10 lg:px-10 px-5 py-7 relative">
                    <div className="xl:w-[75%] lg:w-[65%]">
                        <div className="w-full relative h-[20vh]">
                            <Image src={blog.img} alt={`${blog.name}`} fill className="object-cover" />
                        </div>
                        <p className="mt-3">{new Date(blog.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })} by <span className="font-bold underline"> {blog.author.name}</span> </p>
                        <div className="mt-5 mb-10">
                            {
                                blog.details.map((pd, i) => <div key={i}>
                                    {
                                        pd.key === 'text' &&
                                            <div dangerouslySetInnerHTML={{__html: pd.text}} className='quill-css mt-5'></div>
                                    }
                                    {
                                        pd.key === 'img' &&
                                            <img src={pd.img}
                                                alt={`${blog.name}-${i}`} className='w-full  mt-5'/>

                                    }
                                    {
                                        pd.key === 'url' &&
                                            <>
                                                <YouTube videoId={pd.url.toString().split('=')[1]}
                                                    className='aspect-video youtube-video w-full h-full object-cover my-5 lg:mb-0'/>
                                            </>
                                    }
                                </div>)
                            }
                        </div>
                    </div>
                    <div className="xl:w-[20%] lg:w-[30%] md:w-[50%] mx-auto">
                        <div className="bg-[#e5e5e5] flex flex-col p-5 pt-10 lg:sticky lg:top-[5%] lg:right-0">
                            <div className="relative w-[65%] h-[20vh] self-center">
                                <Image src={blog.author.img} alt={blog.author.name} fill className="object-cover"/>
                            </div>
                            <p className="text-center mt-5 text-2xl laptop:text-xl font-bold">{blog.author.name}</p>
                            <p className=" text-base-300 text-center font-bold laptop:text-sm">{blog.author.expertise}</p>
                            <div dangerouslySetInnerHTML={{__html: blog.author.description}} className="quill-css mt-5"/>
                        </div>
                    </div>
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