import React, {useState} from 'react';
import {Input} from "@nextui-org/react";
import {EyeSlashFilledIcon} from "@/components/Icons/EyeSlashFilledIcon";
import {EyeFilledIcon} from "@/components/Icons/EyeFilledIcon";

const CustomInput = ({label, type, registerField, register, isInvalid = false, errorMessage}) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <Input type={type === 'password' ? isVisible ? 'text' : 'password' : type}
               radius={'none'}
               variant={'bordered'}
               label={label}
               size={'lg'}
               classNames={{
                   inputWrapper: 'border-base-200 focus:border-base-200 border',
                   label: "text-base-200",
               }}

               endContent={
                   type === 'password' &&
                   <button className="focus:outline-none  translate-y-[-35%]" type="button"
                           onClick={toggleVisibility}>
                       {isVisible ? (
                           <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                       ) : (
                           <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                       )}
                   </button>
               }
               isInvalid={isInvalid}
               errorMessage={isInvalid && errorMessage}

               {...register(registerField, {required: true})}
        />
    );
};

export default CustomInput;