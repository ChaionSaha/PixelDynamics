import ControlledInput from "@/components/Shared/ControlledInput";
import { Button, Spinner, Switch } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

export default function SubscriptionPlanForm({ plan, isEdit }) {
    const { control, handleSubmit, watch, reset } = useForm({
        defaultValues: {
            name: '',
            price: '',
            description: [],
            offers: [],
            discount: false,
            discountAmount: '',
        }
    });
    const { fields: descriptionFields, append: appendDescription, remove: removeDescription } = useFieldArray({ control, name: 'description' });
    const { fields: offersFields, append: appendOffer, remove: removeOffer } = useFieldArray({ control, name: 'offers' });
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');
    const router = useRouter();

    useEffect(() => {
        reset({...plan})
    },[plan, reset])

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
                <ControlledInput control={control} name={'price'} label={'Regular Price (Per month in USD)'} />
                <div className="flex flex-col">
                    <Controller control={control}
                        name='discount'
                        render={({ field: { value, onChange } }) =>
                            <Switch
                                isSelected={value}
                                onValueChange={onChange}
                                className='mt-10 mb-5'
                                classNames={{
                                    wrapper: "bg-base-300"
                                }}
                            >
                                <p className='text-white text-xl'>Discount</p>
                            </Switch>}
                    />
                    {
                        watch('discount') &&
                        <ControlledInput control={control} name="discountAmount" label="Discount Amount" />
                    }
                </div>
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
