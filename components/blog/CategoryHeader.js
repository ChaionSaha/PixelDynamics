import { SearchIcon } from "@/assets/CustomIcons/CustomIcon";
import { Input, Radio, RadioGroup } from "@nextui-org/react";
import { useEffect, useState } from "react";

const CategoryHeader = ({ categories, blogs, setBlogs }) => {
    const [searchInput, setSearchInput] = useState('');
    const [selected, setSelected] = useState('all');

    useEffect(() => {
        if (selected === 'all')
            setBlogs(blogs);
        else
            setBlogs(blogs.filter(b => b.category === selected));
    }, [selected, blogs, setBlogs]);

    useEffect(() => {
        if(searchInput === '')
            setBlogs(blogs);
        else
            setBlogs(blogs.filter(b => b.name.toLowerCase().includes(searchInput.toLowerCase())));
    },[searchInput, blogs, setBlogs]);

    return (
        <div className="bg-[#ebebeb] flex flex-col lg:flex-row">
            <div className="lg:px-7 flex flex-col md:flex-row gap-x-3 text-xl laptop:text-lg p-4 laptop:py-3 lg:w-[80%]">
                <p>Category:</p>
                <RadioGroup
                    value={selected}
                    onValueChange={setSelected}
                    className="flex flex-wrap"
                    orientation="horizontal"
                    size="lg"
                >
                    <Radio value={"all"} className="text-xl font-bold lg:px-4" classNames={{
                        wrapper:'hidden'
                    }}>All</Radio>
                    {
                        categories.map((c, i) => 
                            <Radio value={c.value} key={i} className="text-xl laptop:text-lg font-bold lg:px-4" classNames={{
                                wrapper:'hidden'
                            }}>{c.name }</Radio>
                        )
                    }
                </RadioGroup>
                
            </div>
            <div className="lg:w-[20%] w-full bg-black flex">
                <Input
                    type="text"
                    placeholder="Search"
                    startContent={
                        <SearchIcon className='w-5 h-5'/>
                    }
                    variant='bordered'
                    size="lg"
                    className="text-white self-center "
                    classNames={{
                        inputWrapper: 'rounded-none border-0',
                        base: 'text-white'
                    }}
                    onValueChange={setSearchInput}
                />
            </div>
        </div>
    );
}

export default CategoryHeader;