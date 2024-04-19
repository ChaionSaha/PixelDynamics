import React, {useEffect, useRef, useState} from 'react';
import {useForm} from "react-hook-form";
import ControlledInput from "@/components/Shared/ControlledInput";
import axios from "axios";
import ControlledSelect from "@/components/Shared/ControlledSelect";
import ImageInput from "@/components/Shared/ImageInput";

const AddPortfolioForm = () => {
    const {
        register,
        setValue,
        getFieldState,
        watch,
        handleSubmit,
        control,
        formState
    } = useForm({
        defaultValues: {
            name: "",
            mainCat: "",
            subCat: "",
            profileImage: '',
            description: []
        }
    });
    const [allCat, setAllCat] = useState({mainCategories: [], subCategories: []});
    const [subCat, setSubCat] = useState([]);
    const formRef = useRef(null);

    useEffect(() => {
        axios('/api/get-categories').then(data => {
            setAllCat(data.data);
        }).catch(err => console.log(err));
    }, []);

    const handlePortfolioSubmit = (data) => {
        console.log(data);
    }

    useEffect(() => {
        const state = getFieldState('mainCat');
        if (state.isDirty) {
            setValue('subCat', "")
        }
    }, [formState, getFieldState]);

    return (
        <form onSubmit={handleSubmit(handlePortfolioSubmit)} ref={formRef}>
            <div className="grid md:grid-cols-2 md:gap-10 gap-5">
                <ControlledInput control={control} name={"name"} label="Portfolio Name" type='text'/>
                <ControlledSelect control={control} name={"mainCat"} label="Select Main Category"
                                  array={allCat.mainCategories}
                                  editState={false}/>

                <ControlledSelect control={control} name={"subCat"} label="Select Sub Category"
                                  array={[...allCat.subCategories.filter(mc => mc.mainCatValue === watch('mainCat'))]}
                                  editState={false}/>


            </div>
            <div class="md:my-10 my-5">
                <p className='my-3'>Profile Image</p>
                <ImageInput fieldName='profileImage' setValue={setValue}/>
            </div>
            <button type='submit' className='btn'>Submit</button>
        </form>
    );
};

export default AddPortfolioForm;