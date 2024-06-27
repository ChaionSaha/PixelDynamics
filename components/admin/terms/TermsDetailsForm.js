import ControlledInput from "@/components/Shared/ControlledInput";
import { Button, Spinner } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import EditPortfolioDetailsSection from "../portfolio/EditPortfolioDetailsSection";
import PortfolioDetailsSection from "../portfolio/PortfolioDetailsSection";

const TermsDetailsForm = ({page, editState}) => {
    const { control, setValue, handleSubmit, reset } = useForm({
        defaultValues: {
            pageName: '',
            description: []
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "description"
    });
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (editState)
            reset(page);
    }, [reset, page, editState]);

    
    const handleFormSubmit = async (formData) => {
        setLoading(true);
        setErr('')
        axios.post('/api/admin/terms/add-edit-terms-page', { ...formData, editState })
            .then(() => router.push('/admin/terms'))
            .catch(err => setErr(err?.response?.data?.message))
            .finally(() => setLoading(false));
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="grid lg:grid-cols-2">
                <ControlledInput control={control} name={'pageName'} label={'Page Name'}/>
            </div>
            <p className="mt-10">Page Details</p>
            <div className="flex flex-col gap-y-5 mt-3">
                {
                    !editState &&
                        <>
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
                        </>
                }
                {
                    editState && 
                    <>
                        {
                            fields.map((field, index) => {
                                return <div key={field.id} className='gap-x-3 flex border border-base-300 flex-col p-3 gap-y-3'>
                                    <div className="flex items-center justify-between">
                                        <p>Section {index + 1}</p>
                                        <button onClick={async (e) => {
                                            remove(index);
                                        }} className='btn btn-sm rounded-none btn-outline btn-error'>
                                            {/*<i className='bi bi-trash'></i>*/}
                                    Delete Section
                                        </button>
                                    </div>
                                    <EditPortfolioDetailsSection setValue={setValue} fieldName={'description'}
                                        id={index}
                                        control={control} remove={remove} fieldValue={field}/>
                                </div>
                            })
                        }
                        <Button color="primary" radius={'none'} className='w-fit '
                            onClick={() => append(1)}>
                    Add Section
                        </Button>
                    </>
                }
            </div>
            {
                err !== '' && <p className='text-error my-5'>{err}</p>
            }
            <Button disabled={loading} radius={'none'} variant='bordered' className='w-fit border text-white my-5'
                type='submit'>
                {loading ? <Spinner color='white'/> : editState ? 'Update Page' : 'Add Page'}
            </Button>
        </form>
    );
}

export default TermsDetailsForm;