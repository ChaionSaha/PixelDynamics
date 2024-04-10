import React, {useRef} from 'react';
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import Slider from "react-slick";
import Slide from "@/components/team/Slide";

const TeamCarousel = ({team}) => {
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 10000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };
    return (
        <div>
            <div className="flex gap-x-3 mt-5 px-5 lg:ps-16 lg:pe-0">
                <button className='text-lg ' onClick={() => sliderRef.current.slickPrev()}>
                    <ChevronLeftIcon className='w-7'/>
                </button>
                <button className='text-lg' onClick={() => sliderRef.current.slickNext()}>
                    <ChevronRightIcon className='w-7'/>
                </button>
            </div>

            <div className="lg:mt-5">
                <Slider {...settings} ref={slider => {
                    sliderRef.current = slider;
                }}>
                    {
                        team.map((t, i) => {
                            if (t.featured)
                                return <Slide {...t} key={i}/>;
                        })
                    }
                </Slider>
            </div>
        </div>
    );
};

export default TeamCarousel;