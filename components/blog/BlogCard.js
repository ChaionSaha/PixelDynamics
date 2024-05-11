import Image from "next/image";
import { useEffect, useState } from "react";

const BlogCard = ({ blog, blogCategories }) => {
    const [date, setDate] = useState();
    const [category, setCategory] = useState('');
    
    useEffect(() => {
        let TempDate = new Date(blog.date);
        setDate(TempDate.toLocaleDateString("en-UK", {
            year: 'numeric', month: 'long', day: 'numeric'
        }));
    }, [blog.date]);

    useEffect(() => {
        let tempCat = blogCategories.find(c => c.value === blog.category);
        setCategory(tempCat.name);
    },[blogCategories, blog.category])

    return (
        <div className="border border-secondary hover:border-black duration-300 flex flex-col group">
            <div className="relative h-[25vh] overflow-hidden">
                <Image src={blog.img} fill alt={blog.name} className="object-cover group-hover:scale-110 duration-500"/>
            </div>
            <div className="p-5 flex-grow">
                <p className="text-4xl font-bold" >{blog.name}</p>
                <div className="mt-2" dangerouslySetInnerHTML={{__html: blog.description}}/>
            </div>
            <div className="flex mt-5 p-5 gap-x-3">
                <p className="bg-[#d9d9d9] px-5 py-2">
                    {date}
                </p>
                <p className="border border-[#333] px-5 py-2">
                    {category}
                </p>
            </div>
        </div>
    );
}

export default BlogCard;