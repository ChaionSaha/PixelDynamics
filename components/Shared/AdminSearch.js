import React from 'react';
import {Button, Input} from "@nextui-org/react";

const AdminSearch = ({setSearchInput, addBtnName, addBtnFnc}) => {
    return (
        <div className="flex md:flex-row flex-col gap-y-5 justify-between px-10 py-10">
            <div className="lg:w-[30%] md:w-[50%] w-full">
                <Input
                    type="text"
                    placeholder="Search"
                    startContent={
                        <i className='bi bi-search'></i>
                    }
                    variant='bordered'
                    size="lg"
                    classNames={{
                        inputWrapper: 'rounded-none border',
                    }}
                    onValueChange={setSearchInput}
                />
            </div>
            <Button onClick={addBtnFnc} size='lg'
                    radius="none" startContent={<i className='bi bi-plus'></i>}>
                {addBtnName}
            </Button>
        </div>
    );
};

export default AdminSearch;