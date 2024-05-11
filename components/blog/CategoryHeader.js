import { Input, Radio, RadioGroup } from "@nextui-org/react";
import { useEffect, useState } from "react";

const CategoryHeader = ({ categories }) => {
    const [searchInput, setSearchInput] = useState('');
    const [selected, setSelected] = useState('all');

    useEffect(() => {
        console.log(selected)
    },[selected])

    return (
        <div className="bg-[#ebebeb] flex">
            <div className="px-10 flex gap-x-5 text-xl p-4 flex-grow">
                <p>Category:</p>
                <RadioGroup
                    value={selected}
                    onValueChange={setSelected}
                    className="flex"
                    orientation="horizontal"
                    size="lg"
                >
                    <Radio value={"all"} className="text-xl font-bold px-4" classNames={{
                        wrapper:'hidden'
                    }}>All</Radio>
                    {
                        categories.map((c, i) => 
                            <Radio value={c.value} key={i} className="text-xl font-bold px-4" classNames={{
                                wrapper:'hidden'
                            }}>{c.name }</Radio>
                        )
                    }
                </RadioGroup>
                
            </div>
            <div className="w-[30%] bg-black flex">
                <Input
                    type="text"
                    placeholder="Search"
                    startContent={
                        <i className='bi bi-search'></i>
                    }
                    variant='bordered'
                    size="lg"
                    className="text-white self-center"
                    classNames={{
                        inputWrapper: 'rounded-none border-0',
                    }}
                    onValueChange={setSearchInput}
                />
            </div>
        </div>
    );
}

export default CategoryHeader;