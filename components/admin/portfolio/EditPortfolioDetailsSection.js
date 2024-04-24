import ImageInput from "@/components/Shared/ImageInput";
import QuillEditor from "@/components/quill-test/QuillEditor";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { Controller } from "react-hook-form";

const EditPortfolioDetailsSection = ({setValue, fieldName, id, control, remove, fieldValue}) => {
    const [section, setSection] = useState('');
    const [isNew, setIsNew] = useState(true);

    useEffect(() => {
        if (fieldValue) {
            setSection(fieldValue?.key)
        }
        if (fieldValue.key)
            setIsNew(false);

    }, [fieldValue]);

    return (
        <>
            {
                isNew &&
                <Dropdown backdrop="opaque" className='bg-admin-secondary w-fit'>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            radius="none"
                            className='text-white border w-fit'
                        >
                            Select Section Item
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Action event example"
                        onAction={(key) => {
                            setSection(key);
                            setValue(`${fieldName}.${id}.key`, key);
                            setIsNew(false);
                        }}
                        className='rounded-none'
                    >
                        <DropdownItem className='text-white' key="text">Text</DropdownItem>
                        <DropdownItem className='text-white' key="img">Image</DropdownItem>
                        <DropdownItem className='text-white' key="url">Youtube Video Link</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            }
            {
                section !== '' &&

                <>
                    {
                        section === 'img' &&
                        <ImageInput setValue={setValue}
                            fieldName={`${fieldName}.${id}.img`} oldImage={fieldValue && fieldValue[section]}/>

                    }
                    {
                        section === 'text' &&
                        <QuillEditor setValue={setValue} id={`${fieldName}.${id}.text`}
                            defaultValue={fieldValue && fieldValue[section]}/>

                    }
                    {
                        section === 'url' &&
                        <UrlLink control={control} name={`${fieldName}.${id}.url`}/>
                    }
                </>

            }


        </>
    );
};

export default EditPortfolioDetailsSection;

const UrlLink = ({name, control, defaultValue}) => {

    return <Controller control={control} name={name}
        render={({field: {onChange, value}}) =>
            <Input
                isRequired
                type='url'
                name={name}
                label='Youtube URL'
                variant='bordered'
                size="lg"
                defaultValue={defaultValue}
                classNames={{
                    base: 'text-white',
                    inputWrapper: 'rounded-none border',
                    label: 'text-white'
                }}
                onChange={onChange}
                value={value}
            />}/>
}