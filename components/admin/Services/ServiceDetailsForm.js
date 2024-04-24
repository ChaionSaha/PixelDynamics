import ControlledInput from '@/components/Shared/ControlledInput';
import { Button, Spinner } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

export default function ServiceDetailsForm({service, isEdit}) {
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            title: "",
            list: []
        }
    });
    const router = useRouter();

    const { append, remove, fields } = useFieldArray({
        control,
        name: 'list'
    });

    useEffect(() => {
        if (isEdit)
        {    
            reset({
                ...service
            })    
        }
    }, [service, reset, isEdit])
    
    const handleFormSubmit = async(formData) => {
        setLoading(true);
        setErr('');
        axios.post('/api/admin/services/add-edit-service', { ...formData, isEdit })
            .then(res => router.push('/admin/services/services-details'))
            .catch(({ response }) => { setErr(response?.data?.message) })
            .finally(() => setLoading(false));
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <ControlledInput control={control} name='title' label='Service Name' type={'text'} />
            <div className="flex flex-col lg:w-[50%] gap-y-5 mt-10">
                <p className='text-xl'>Services List</p>
                {
                    fields.map((field, index) =>
                        <div key={field.id} className='flex gap-x-1 w-full'>
                            <ControlledInput type={'text'} label={`Service ${index + 1}`} control={control} name={`list.${index}.text`} />
                            <button onClick={(e) => {
                                e.preventDefault();
                                remove(index);
                            }} className='btn btn-sm rounded-none h-full btn-outline btn-error'>
                                <i className='bi bi-trash'></i>
                            </button>
                        </div>)
                }
                <Button color="primary" radius={'none'} className='w-fit '
                    onClick={() => append(1)}>
                        Add Item
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
