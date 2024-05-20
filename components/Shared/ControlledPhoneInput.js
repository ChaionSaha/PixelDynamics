import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/material.css';

const ControlledPhoneInput = ({control, name, label, rightSideLabel}) => {
    return (
        <Controller name={name} control={control} render={({ field: { value, onChange } }) =>
            <div className="flex flex-col gap-y-1">
                <div className="flex justify-between">
                    <p>{label}</p>
                    <p>{rightSideLabel}</p>
                </div>
                <PhoneInput
                    enableAreaCodes={false}
                    value={value}
                    onChange={onChange}
                    specialLabel=""
                    countryCodeEditable={false}
                    country={'us'}
                    inputClass="input input-bordered focus:outline-0 border-base-200 focus:border-black rounded-none flex-grow"
                    inputStyle={{
                        width: '100%',
                        borderRadius: '0px',
                    }}
                />
            </div>
        } />
    );
}

export default ControlledPhoneInput;