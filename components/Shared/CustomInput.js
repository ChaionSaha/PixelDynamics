import React from 'react';
import {Input} from "@nextui-org/react";

const CustomInput = ({label, type, registerField, register}) => {
    return (
        <Input type={type}
               radius={'none'}
               variant={'bordered'}
               label={label}
               size={'lg'}
               classNames={{
                   inputWrapper: 'border-0',
                   base: 'border-base-200 focus:border-base-200 border',
                   label: "text-base-200",
               }}

               {...register(registerField, {required: true})}
        />
    );
};

export default CustomInput;