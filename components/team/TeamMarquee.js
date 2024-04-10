import React from 'react';
import Marquee from "react-fast-marquee";
import companies from "@/assets/companyImages";
import Image from 'next/image';

const TeamMarquee = () => {
    return (
        <div>
            <div className='px-10 pb-5 lg:ps-16 lg:pe-0'>
                <p className='text-xl lg:text-3xl font-bold'>Combined Industry Experience</p>
                <p className='text-base lg:text-xl'>A Preferred Choice for Leading Brands. Combined Expertise That Sets
                    Industry
                    Standards.</p>
            </div>
            <Marquee autoFill speed={20} className='pb-5'>
                {
                    companies.map((c, i) => {
                        return <div key={i} className='md:px-10 px-5'><Image key={i} src={c.img} alt={c.name}/></div>
                    })
                }
            </Marquee>
        </div>
    );
};

export default TeamMarquee;