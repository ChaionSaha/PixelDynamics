import { Select, SelectItem } from "@nextui-org/react";
import { Controller } from "react-hook-form";

const ControlledSelect = ({control, name, array, label, editState}) => {
    return (
        <Controller name={name} control={control}
            render={({field: {onChange, value}}) => <Select
                isRequired
                label={label}
                variant='bordered'
                radius={'none'}
                name={name}
                size="lg"
                selectedKeys={editState && value !== '' && [value]}
                classNames={{
                    base: 'text-white',
                    trigger: 'border',
                    label: 'text-white',
                    value: 'text-white'
                }}
                onChange={onChange}
            >
                <SelectItem key={""} value={""}>
                    {label}
                </SelectItem>
                {array.map((mc, i) => (
                    <SelectItem key={mc.value} value={mc.value}>
                        {mc.name}
                    </SelectItem>
                ))}
            </Select>}/>
    );
};

export default ControlledSelect;