
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { EyeFilledIcon } from "../Icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../Icons/EyeSlashFilledIcon";

const ControlledPasswordInput = ({ control, name, label }) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <Controller
            name={name}
            control={control}
            render={({ field:{onChange, value} }) => (
                <Input
                    label={label ? label : "Password"}
                    variant="bordered"
                    radius="none"
                    size="lg"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    onValueChange={onChange}
                    value={value}
                />
            )}
        />
    );
}

export default ControlledPasswordInput;