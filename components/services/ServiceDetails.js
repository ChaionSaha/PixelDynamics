import React from 'react';
import Image from "next/image";
import blackBox from "@/assets/black-box.png";

const ServiceDetails = ({title, list}) => {
    return (
        <div
            className="flex flex-col border border-transparent hover:border-black duration-300 p-5 xl:p-9 py-8 bg-secondary hover:bg-base-100">
            <p className="font-bold text-xl xl:text-2xl flex items-center gap-x-3">
                {/*<i className="bi bi-square-fill text-base"></i>*/}
                <Image src={blackBox} alt="black box"/>
                {title}
            </p>
            <ul className="flex flex-col mt-3 gap-y-2">
                {
                    list.map((l, i) => <li key={i}
                                           className="xl:text-lg font-semibold">{l.text}</li>)
                }
            </ul>
        </div>
    );
};

export default ServiceDetails;