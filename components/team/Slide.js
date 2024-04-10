import React from 'react';
import Image from "next/image";

const Slide = ({name, img, title, experience, expertise, description}) => {

    return (
        <div className='flex lg:flex-row flex-col gap-y-5 overflow-y-visible mt-5 lg:mt-0 px-5 lg:ps-16 lg:pe-0'>
            <div className="lg:w-[65%] w-[100%] order-last lg:order-fast">
                <p className="lg:text-5xl text-3xl font-bold">{name}</p>
                <p className='lg:text-3xl text-xl mt-3 lg:w-[80%] w-[100%]'>{title}</p>
                <div className="flex lg:flex-row gap-y-5 flex-col my-8 lg:my-16 gap-x-10 max-w-[90%]">
                    <div className="border-s-4 lg:border-s-8 border-black ps-4 flex flex-col">
                        <p className='text-sm lg:text-base text-base-300'>Industry Experience</p>
                        <p className='text-lg lg:text-2xl font-bold'>{experience} Years</p>
                    </div>
                    <div className="border-s-4 lg:border-s-8 border-black ps-4 flex flex-col">
                        <p className='text-sm lg:text-base text-base-300'>Area of Expertise</p>
                        <p className='text-lg lg:text-2xl font-bold'>{expertise}</p>
                    </div>
                </div>
                <div className='lg:text-xl text-base lg:w-[80%] w-[100%]'
                     dangerouslySetInnerHTML={{__html: description}}></div>
            </div>
            <div
                className="lg:w-[35%] w-[100%] md:w-[50%] lg:h-[60vh] h-[40vh] flex mx-auto justify-end relative order-fast lg:order-last">
                <Image src={img} className='object-cover ' alt={name} fill
                       loading={'eager'} quality={100}/>
            </div>
        </div>
    );
};

export default Slide;
