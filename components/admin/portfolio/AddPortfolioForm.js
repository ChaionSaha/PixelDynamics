import ControlledInput from "@/components/Shared/ControlledInput";
import ControlledSelect from "@/components/Shared/ControlledSelect";
import ImageInput from "@/components/Shared/ImageInput";
import PortfolioDetailsSection from "@/components/admin/portfolio/PortfolioDetailsSection";
import { Button, Spinner } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from 'react';
import { useFieldArray, useForm } from "react-hook-form";

const AddPortfolioForm = () => {
    const {
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
    const {fields, append, remove} = useFieldArray({
        control,
        name: 'description',
    })
    const [allCat, setAllCat] = useState({mainCategories: [], subCategories: []});
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [err, setErr] = useState('');
    const [portfolioNumbers, setPortfolioNumbers] = useState([]);

    useEffect(() => {
        axios('/api/get-categories').then(data => {
            setAllCat(data.data);
        }).catch(err => console.log(err));

        axios('/api/admin/get-all-portfolio-numbers').then(data => setPortfolioNumbers(data.data)).catch(err => console.log(err));
    }, []);

    const handlePortfolioSubmit = (formData) => {
        setLoading(true);
        setErr('');

        if (portfolioNumbers.includes(formData.position))
            return;

        axios.post('/api/admin/portfolio/add-edit-portfolio', {...formData, edit: false})
            .then((data) => {
                setLoading(false);
                router.push('/admin/portfolio/portfolio-details');
            }).catch(({response}) => {
                setLoading(false);
                setErr(response?.data?.message);
            });
    }


    return (
        <form onSubmit={handleSubmit(handlePortfolioSubmit)} ref={formRef}>
            <div className="grid md:grid-cols-2 md:gap-10 gap-5">
                <ControlledInput control={control} name={"name"} label="Portfolio Name" type='text'/>
                <div>
                    <ControlledInput control={control} name={"position"} label="Portfolio Position" type='number'/>
                    {
                        portfolioNumbers.includes(watch('position')) &&
                        <p className='text-error'>This number is already set a Portfolio!</p>
                    }
                </div>
                <ControlledSelect control={control} name={"mainCat"} label="Select Main Category"
                    array={allCat.mainCategories}
                    editState={false}/>
                {
                    watch('mainCat') &&
                    <ControlledSelect control={control} name={"subCat"} label="Select Sub Category"
                        array={[...allCat.subCategories.filter(mc => mc.mainCatValue === watch('mainCat'))]}
                        editState={false}/>
                }


            </div>
            <div className="md:my-10 my-5">
                <p className='my-3'>Profile Image</p>
                <ImageInput fieldName='profileImage' setValue={setValue}/>
            </div>

            <p className='mb-3'>Portfolio Description</p>
            <div className="flex flex-col gap-y-5">
                {
                    fields.map((field, index) => {
                        return <div key={field.id} className='flex gap-x-3'>
                            <div className="flex-grow">

                                <PortfolioDetailsSection setValue={setValue} fieldName={'description'}
                                    id={index}
                                    control={control} remove={remove}/>
                            </div>

                        </div>
                    })
                }
                <Button color="primary" radius={'none'} className='w-fit '
                    onClick={() => append(1)}>
                    Add Section
                </Button>
            </div>
            {
                err !== '' && <p className='text-error my-5'>{err}</p>
            }
            <Button disabled={loading} radius={'none'} variant='bordered' className='w-fit border text-white my-5'
                type='submit'>
                {loading ? <Spinner color='white'/> : 'Submit'}
            </Button>
        </form>
    );
};

export default AddPortfolioForm;