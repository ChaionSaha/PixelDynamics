import Image from 'next/image';


const TeamMember = ({ img, experienceDetails, name, expertise }) => {
    return (
        <div
            className="relative border h-[50vh] w-[80%] mx-auto md:w-full team-member overflow-y-hidden">
            <Image src={img} alt={name} fill className={`object-cover object-center`}
            />
            <div className="absolute font-bold px-5 pb-5 text-white bottom-0 left-0">
                <p className='text-2xl lg:text-xl xl:text-2xl laptop:text-xl'>{name}</p>
                <p className='text-lg lg:text-base xl:text-lg laptop:text-base'>{expertise}</p>
            </div>
            <div className="absolute w-full h-full z-[10] p-5 bg-black text-white team-member-experience">
                <div className=" font-bold text-white ">
                    <p className='text-2xl laptop:text-xl'>{name}</p>
                    <p className='text-lg laptop:text-base text-base-200 font-semibold'>{expertise}</p>
                </div>
                <div className="w-[60%] h-1 bg-base-100 my-8"></div>
                <ul className='flex flex-col gap-y-3 '>
                    {
                        experienceDetails.map((ed, i) => <li key={i} className='flex list-[square] gap-x-3'>
                            <i className='bi bi-square-fill lg:text-sm laptop:text-xs text-xs'></i>
                            <p className=' leading-tight text-sm laptop:text-xs'>{ed.text}</p>
                        </li>)
                    }
                </ul>
            </div>
        </div>
    );
};

export default TeamMember;