import React, {useEffect, useState} from 'react';
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input} from "@nextui-org/react";
import ImageInput from "@/components/Shared/ImageInput";
import QuillEditor from "@/components/quill-test/QuillEditor";
import {Controller} from "react-hook-form";

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
                <Dropdown backdrop="opaque" className='bg-admin-secondary'>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            radius="none"
                            className='text-white border'
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

                <div className='flex border border-base-300 flex-col p-3 gap-y-3'>
                    <div className="flex items-center justify-between">
                        <p>Section {id + 1}</p>
                        <button onClick={(e) => {
                            e.preventDefault();
                            remove(id);
                        }} className='btn btn-sm rounded-none btn-outline btn-error'>
                            {/*<i className='bi bi-trash'></i>*/}
                            Delete Section
                        </button>
                    </div>
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
                </div>
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