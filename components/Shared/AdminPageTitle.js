import React from 'react';
import {useRouter} from "next/router";

const AdminPageTitle = ({title = ''}) => {
    const router = useRouter();
    const handleRouteChange = (e) => {
        e.preventDefault();
        const currentLocation = router.asPath.split('/');
        currentLocation.pop();
        router.push(currentLocation.join('/'));
    }
    return (
        <div
            className='flex gap-x-5 px-5 border-b text-xl font-semibold  md:text-2xl pt-7 pb-4 border-b-slate-600 lg:ps-10 md:ps-24 ps-20 lg:text-3xl'>
            <button onClick={handleRouteChange}><i className='bi bi-chevron-left'></i></button>
            <p className=''>
                {title}
            </p>
        </div>
    );
};

export default AdminPageTitle;