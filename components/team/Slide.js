import Image from "next/image";

const Slide = ({name, img, title, experience, expertise, description}) => {

    return (
        <div
            className='flex lg:flex-row  flex-col h-full gap-y-5 overflow-y-visible mt-11 lg:mt-0 px-5 lg:ps-16 lg:pe-0'>
            <div className="lg:w-[65%] w-[100%] order-last lg:order-fast lg:mt-16 mt-5">
                <p className="lg:text-5xl laptop:text-3xl text-3xl font-bold">{name}</p>
                <p className='lg:text-3xl laptop:text-xl text-xl mt-2 laptop:mt-0 lg:w-[80%] w-[100%]'>{title}</p>
                <div className="flex  lg:flex-row gap-y-5 flex-col my-8 lg:my-16 laptop:my-8 gap-x-10 max-w-[90%] ms-1">
                    <div className="border-s-4 lg:border-s-8 border-black ps-4 flex flex-col">
                        <p className='text-sm lg:text-base text-base-300'>Industry Experience</p>
                        <p className='text-lg laptop:text-xl lg:text-2xl font-bold'>{experience} Years</p>
                    </div>
                    <div className="border-s-4 lg:border-s-8 border-black ps-4 flex flex-col">
                        <p className='text-sm lg:text-base text-base-300'>Area of Expertise</p>
                        <p className='text-lg laptop:text-xl lg:text-2xl font-bold'>{expertise}</p>
                    </div>
                </div>
                <div className='lg:text-xl laptop:text-base text-base lg:w-[80%] w-[100%]'
                    dangerouslySetInnerHTML={{__html: description}}></div>
            </div>
            <div
                className="lg:w-[35%] w-[100%] md:w-[50%] lg:min-h-[69vh] m-0 laptop:min-h-[50vh] laptop:w-[30%] min-h-[40vh] h-full flex mx-auto justify-end relative order-fast lg:order-last ">
                <Image src={img} className='object-cover m-0' alt={name} fill
                    loading={'eager'} quality={100} priority/>
            </div>
        </div>
    );
};

export default Slide;
