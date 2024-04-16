import React from 'react';

const AdminPageTitle = ({title = ''}) => {
    return (
        <p className='text-xl font-semibold border-b md:text-2xl pt-7 pb-4 border-b-slate-600 ps-16 lg:text-3xl'>
            {title}
        </p>
    );
};

export default AdminPageTitle;