"use client"

import QuillEditor from "@/components/quill-test/QuillEditor";
import { useFieldArray, useForm } from "react-hook-form";

const App = () => {

    const {control, register, handleSubmit, setValue} = useForm();
    const {fields, append, prepend, remove, swap, move, insert} = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormProvider)
        name: "test", // unique name for your Field Array
    });

    const handleFormChange = (formData) => {
        console.log(formData);
    }


    return (
        <div className="container mx-auto py-10">
            <button className='btn btn-primary btn-sm text-white' onClick={() => append(2)}>Add Field</button>
            <form onSubmit={handleSubmit(handleFormChange)} className="flex flex-col gap-y-5 mt-10">
                {fields.map((field, index) => (
                    <div key={field.id}>
                        <input
                            {...register(`test.${index}.value`)}
                            className="input input-bordered"
                        />
                        <QuillEditor id={`test.${index}.text`} setValue={setValue}/>
                    </div>

                ))}
                <button className='btn btn-secondary w-fit'>Submit</button>
            </form>
        </div>
    );

};

export default App;