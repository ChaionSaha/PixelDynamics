import React from 'react';
import Image from 'next/image'
import './team.css';

const TeamMember = ({img, experienceDetails, name, expertise}) => {
    return (
        <div
            className="relative lg:h-[45vh] border h-[50vh] w-[80%] mx-auto md:w-full team-member overflow-y-hidden">
            <Image src={img} alt={name} fill className="object-cover object-center"/>
            <div className="absolute mix-blend-screen font-bold px-5 pb-5 text-white bottom-0 left-0">
                <p className='text-2xl '>{name}</p>
                <p className='text-lg '>{expertise}</p>
            </div>
            <div className="absolute w-full h-full z-[10] p-5 bg-black text-white team-member-experience">
                <div className=" font-bold text-white ">
                    <p className='text-2xl '>{name}</p>
                    <p className='text-lg  text-base-200 font-semibold'>{expertise}</p>
                </div>
                <div className="w-[60%] h-1 bg-base-100 my-4"></div>
                <ul className='flex flex-col gap-y-3 '>
                    {
                        experienceDetails.map((ed, i) => <li key={i} className='flex list-[square] gap-x-3'>
                            <i className='bi bi-square-fill lg:text-sm text-xs'></i>
                            <p className=' leading-tight text-sm'>{ed.text}</p>
                        </li>)
                    }
                </ul>
            </div>
        </div>
    );
};

export default TeamMember;