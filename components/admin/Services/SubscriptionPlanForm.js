import ControlledInput from "@/components/Shared/ControlledInput";
import { Button, Spinner } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export default function SubscriptionPlanForm({ plan, isEdit }) {
    const { control, handleSubmit } = useForm({ defaultValues: plan });
    const { fields: descriptionFields, append: appendDescription, remove: removeDescription } = useFieldArray({ control, name: 'description' });
    const { fields: offersFields, append: appendOffer, remove: removeOffer } = useFieldArray({ control, name: 'offers' });
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');
    const router = useRouter();

    const handleSubmitForm = async (formData) => {
        setErr('');
        setLoading(true);
        axios.post('/api/admin/services/add-edit-plan', { ...formData, isEdit })
            .then(res => router.push('/admin/services/subscriptions'))
            .catch(({ response }) => setErr(response?.data?.message))
            .finally(() => { setLoading(false); setErr('') });
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="grid md:grid-cols-2 gap-5">
                <ControlledInput control={control} name="name" label="Plan Name" />
                <ControlledInput control={control} name={'price'} label={'Price (Per month in USD)'}/>
            </div>
            <div className="lg:w-[50%] mb-5 mt-10 gap-y-5 flex flex-col">
                <p className="text-xl font-semibold">Plan Description</p>
                {
                    descriptionFields.map((field, index) => (
                        <div key={field.id} className='flex gap-x-1 w-full'>
                            <ControlledInput control={control} name={`description.${index}.text`} label={`Description ${index + 1}`} />
                            <button onClick={(e) => {
                                e.preventDefault();
                                removeDescription(index);
                            }} className='btn btn-sm rounded-none h-full btn-outline btn-error'>
                                <i className='bi bi-trash'></i>
                            </button>
                        </div>
                    ))
                }
                <Button color="primary" radius={'none'} className='w-fit '
                    onClick={() => appendDescription(1)}>
                        Add Description
                </Button>
            </div>


            <div className="lg:w-[50%] mb-5 mt-10 gap-y-5 flex flex-col">
                <p className="text-xl font-semibold">Plan Details</p>
                {
                    offersFields.map((field, index) => (
                        <div key={field.id} className='flex gap-x-1 w-full'>
                            <ControlledInput control={control} name={`offers.${index}.text`} label={`Details ${index + 1}`} />
                            <button onClick={(e) => {
                                e.preventDefault();
                                removeOffer(index);
                            }} className='btn btn-sm rounded-none h-full btn-outline btn-error'>
                                <i className='bi bi-trash'></i>
                            </button>
                        </div>
                    ))
                }
                <Button color="primary" radius={'none'} className='w-fit '
                    onClick={() => appendOffer(1)}>
                        Add Details
                </Button>
            </div>

            {
                err && <p className='text-error mt-5'>{err}</p>
            }
            <Button disabled={loading} radius={'none'} variant='bordered' className='w-fit border text-white my-5' type='submit'>
                {loading ?  <Spinner color='white'/> : isEdit ? 'Update' : 'Add Service'}
            </Button>
        </form>
    )
}
