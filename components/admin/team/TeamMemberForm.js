import QuillEditor from '@/components/quill-test/QuillEditor';
import ControlledInput from '@/components/Shared/ControlledInput';
import ImageInput from '@/components/Shared/ImageInput';
import { Button, Spinner, Switch } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

export default function TeamMemberForm({ member = {}, isEdit = false, teamMemberPositions = []}) {
    const { control, handleSubmit, watch, setValue, reset } = useForm({
        defaultValues: {
            name: "",
            expertise: "",
            position: "",
            img: "",
            featured: false,
            title: "",
            experience: "",
            experienceDetails: [],
        }
    });
    
    const { fields, append, remove } = useFieldArray({ control, name: "experienceDetails" });
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [allPositions, setAllPositions] = useState(teamMemberPositions);

    useEffect(() => {
        if (isEdit)
        {
            reset({ ...member });
            let temp = teamMemberPositions.filter(pos => pos !== member.position);
            console.log(temp);
            setAllPositions(temp);
        }
    }, [isEdit, member, reset, teamMemberPositions]);
    
    const handleSubmitForm = async (formData) => {
        if (allPositions.includes(watch('position')))
            return ;

        setErr('');
        setLoading(true);

        axios.post('/api/admin/team/member-add-edit', { ...formData, isEdit })
            .then(res => router.push('/admin/team'))
            .catch(({ response }) => setErr(response?.data?.message))
            .finally(() => { setLoading(false) });
    }
    
    return (
        <form className='flex flex-col' onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="grid md:grid-cols-2 gap-5">
                <ControlledInput control={control} name={"name"} label="Name" />
                <ControlledInput control={control} name={"expertise"} label="Area of Expertise" />
                <div className="flex flex-col">
                    <ControlledInput control={control} name={"position"} label="Serial Number" />
                    {
                        allPositions && allPositions.includes(watch('position')) &&
                        <p className='text-error mt-2'>Position already exists</p>
                    }
                </div>
                
            </div>

            <div className="mt-10 ">
                <p className='mb-5 text-xl font-bold'>Profile Image</p>
                <ImageInput setValue={setValue} oldImage={member?.img} fieldName={"img"}/>
            </div>

            <div className="mt-10 flex flex-col gap-y-5">
                <p className='text-xl font-bold'>Experiences</p>
                {
                    fields.map((field, index) => (
                        <div key={field.id} className='flex gap-x-1'>
                            <ControlledInput control={control} name={`experienceDetails.${index}.text`} label={`Experience ${index + 1}`} />
                            <button onClick={(e) => {
                                e.preventDefault();
                                remove(index);
                            }} className='btn btn-sm rounded-none h-full btn-outline btn-error'>
                                <i className='bi bi-trash'></i>
                            </button>
                        </div>
                    ))
                }
                <Button color="primary" radius={'none'} className='w-fit '
                    onClick={() => append(1)}>
                        Add Experience
                </Button>
            </div>
            

            <Controller control={control}
                name='featured'
                render={({ field: { value, onChange } }) =>
                    <Switch
                        isSelected={value}
                        onValueChange={onChange}
                        className='mt-10 mb-5'
                        classNames={{
                            wrapper: "bg-base-300"
                        }}
                    >
                        <p className='text-white text-xl'>Featured</p>
                    </Switch>}
            />
            {
                watch('featured') &&
                <>
                    <div className="grid md:grid-cols-2 gap-5">
                        <ControlledInput control={control} name={'experience'} label={'Years of Experience' } />
                        <ControlledInput control={control} name={'title'} label={'Title'} />
                    </div>
                    <div className="mt-10">
                        <p className='text-xl font-bold mb-5'>Description</p>
                        <QuillEditor id={'description'} setValue={setValue} defaultValue={member?.description} />
                    </div>
                </>
            }

            {
                err && <p className='text-error mt-5'>{err}</p>
            }
            <Button disabled={loading} radius={'none'} variant='bordered' className='w-fit border text-white my-10' type='submit'>
                {loading ?  <Spinner color='white'/> : isEdit ? 'Update' : 'Add Member'}
            </Button>

        </form>
    )
}
