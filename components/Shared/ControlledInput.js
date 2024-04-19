import React from 'react';
import {Controller} from "react-hook-form";
import {Input} from "@nextui-org/react";

const ControlledInput = ({control, name, label, type}) => {
    return (
        <Controller control={control} name={name}
                    render={({field: {onChange, value}}) => <Input
                        isRequired
                        type={type}
                        name={name}
                        label={label}
                        variant='bordered'
                        size="lg"
                        classNames={{
                            base: 'text-white',
                            inputWrapper: 'rounded-none border',
                            label: 'text-white'
                        }}
                        onChange={onChange}
                        value={value}
                    />}/>
    );
};

export default ControlledInput;