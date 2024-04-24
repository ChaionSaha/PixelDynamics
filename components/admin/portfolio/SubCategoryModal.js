import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    Spinner
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";

const SubCategoryModal = ({
    isOpen,
    onOpenChange,
    editState = false,
    setEditState,
    value = {},
    mainCat = [],
    setAllData
}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const {register, reset, handleSubmit, control} = useForm({
        defaultValues: {
            subCateName: "",
            mainCatValue: ""
        }
    });

    useEffect(() => {
        if (!editState)
            reset(
                {
                    subCatName: "",
                    mainCatValue: ""
                }
            );
        else {
            reset({
                subCatName: value.name,
                mainCatValue: value.mainCatValue
            })
        }
    }, [editState, reset, value])

    const handleSubcatSubmit = ({subCatName, mainCatValue}, onClose) => {
        setLoading(true);
        setErrorMessage('');
        axios.post('/api/admin/portfolio/add-edit-subcategory', {
            editState,
            subCatName,
            mainCatValue,
            scid: value.scid,
        }).then(data => {
            setAllData(data.data);
            setLoading(false);
            onClose();
            reset();
        }).catch(({response}) => {
            setLoading(false);
            setErrorMessage(response?.data?.message);
        })

    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} classNames={{
            base: 'bg-admin-primary text-base-200'
        }} hideCloseButton={true}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader
                            className="flex flex-col gap-1">{editState ? "Edit Sub Category" : "Add Sub Category"}</ModalHeader>
                        <form className='flex flex-col gap-y-5' onSubmit={handleSubmit(handleSubcatSubmit)}>
                            <ModalBody>
                                <Controller control={control} name='subCatName'
                                    render={({field: {onChange, value}}) => <Input
                                        isRequired
                                        type="text"
                                        label="Category Name"
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

                                <Controller name='mainCatValue' control={control}
                                    render={({field: {onChange, value}}) => <Select
                                        isRequired
                                        label="Select Main Category"
                                        variant='bordered'
                                        radius={'none'}
                                        size="lg"
                                        selectedKeys={editState && [value]}
                                        classNames={{
                                            base: 'text-white',
                                            trigger: 'border',
                                            label: 'text-white',
                                            value: 'text-white'
                                        }}
                                        onChange={onChange}
                                    >
                                        {mainCat.map((mc, i) => (
                                            <SelectItem key={mc.value} value={mc.value}>
                                                {mc.name}
                                            </SelectItem>
                                        ))}
                                    </Select>}/>


                                {
                                    errorMessage &&
                                    <p className='text-error'>{errorMessage}</p>
                                }
                            </ModalBody>
                            <ModalFooter>
                                {
                                    !loading &&
                                    <Button color="danger" radius={'none'} variant="light" onClick={() => {
                                        setErrorMessage('');
                                        onClose();
                                    }}>
                                        Close
                                    </Button>
                                }
                                <Button disabled={loading} color="primary" radius={'none'}
                                    onClick={() => handleSubmit(handleSubcatSubmit)(onClose)}>
                                    {loading ? <Spinner color='white'/> : editState ? 'Update' : 'Save'}
                                </Button>
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default SubCategoryModal;