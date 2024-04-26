import ControlledInput from '@/components/Shared/ControlledInput';
import { Switch } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';

export default function TeamMemberForm({ member = {}, isEdit = false }) {
    const { control, handleSubmit, watch } = useForm({ defaultValues: member });
    
    
    return (
        <form>
            <div className="grid grid-cols-2 gap-5">
                <ControlledInput control={control} name={"name"} label="Name" />
                <ControlledInput control={control} name={"expertise"} label="Area of Expertise" />
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
                        <p className='text-white'>Featured</p>
                    </Switch>}
            />
            

        </form>
    )
}
