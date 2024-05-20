import { Input } from "@nextui-org/react";
import { Controller } from "react-hook-form";

const ControlledClientInput = ({control, name, label, type, labelPlacement}) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) =>
                <Input type={type || "text"}
                    radius={'none'}
                    variant={'bordered'}
                    label={label}
                    size={'lg'}
                    value={value}
                    onChange={onChange}
                    labelPlacement={labelPlacement}
                    placeholder={label}
                    required={true}
                    classNames={{
                        input: "border-black text-lg",
                        inputWrapper: "border-base-200 focus:border-black border",

                    }}
                />}
        />
    );
};

export default ControlledClientInput;