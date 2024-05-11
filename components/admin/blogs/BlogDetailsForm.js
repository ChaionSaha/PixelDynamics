import QuillEditor from "@/components/quill-test/QuillEditor";
import ControlledInput from "@/components/Shared/ControlledInput";
import ImageInput from "@/components/Shared/ImageInput";
import { Button, Select, SelectItem, Spinner } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import EditPortfolioDetailsSection from "../portfolio/EditPortfolioDetailsSection";
import PortfolioDetailsSection from "../portfolio/PortfolioDetailsSection";

function BlogDetailsForm({ blog, editState, blogCategories, authors }) {
    const { control, handleSubmit, setValue, reset } = useForm({
        defaultValues: {
            name: "",
            description: "",
            category: "",
            author: {
                tid: "",
                description: "",
            },
            img: "",
            details: []
        }
    });
    const { append, remove, fields } = useFieldArray({
        control,
        name: 'details'
    });
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (editState)
            reset(blog);
    },[editState, reset, blog])

    const handleSubmitData = async (formData) => {
        setLoading(true);
        setErr('');
        let selectedAuthor = authors.find((author) => author.tid === formData.author.tid);
        formData.author = {
            ...formData.author,
            name: selectedAuthor.name,
            img: selectedAuthor.img,
            expertise: selectedAuthor.expertise,
        }
        axios.post('/api/admin/blog/add-edit-blog', { ...formData, editState })
            .then(data => {
                router.push('/admin/blog/details');
            })
            .catch(err => setErr(err?.response?.data?.message))
            .finally(() => setLoading(false));
    }

    return (
        <form  onSubmit={handleSubmit(handleSubmitData)}>
            <div className="grid md:grid-cols-2 md:gap-10 gap-5">
                <ControlledInput control={control} name={'name'} label={'Blog Title'} />
                <Controller control={control} name="category" render={({ field: { onChange, value } }) =>
                    <Select
                        variant="bordered"
                        radius="none"
                        onChange={onChange}
                        label="Blog Category"
                        selectedKeys={editState && [value]}
                        size="lg"
                        classNames={{
                            base: 'text-white',
                            trigger: 'border',
                            label: 'text-white',
                            value: 'text-white',
                        }}
                    >
                        {
                            blogCategories.map((cat) => <SelectItem key={cat.value} value={cat.value}>{cat.name}</SelectItem>)
                        }
                    </Select>}/>
                <Controller control={control} name="author.tid" render={({ field: { onChange, value } }) =>
                    <Select
                        variant="bordered"
                        radius="none"
                        onChange={onChange}
                        label="Author"
                        selectedKeys={editState && [value]}
                        size="lg"
                        classNames={{
                            base: 'text-white',
                            trigger: 'border',
                            label: 'text-white',
                            value: 'text-white',
                        }}
                    >
                        {
                            authors.map((author) => <SelectItem key={author.tid} value={author.name}>{author.name}</SelectItem>)
                        }
                    </Select>} />
                <div className=""></div>
                <div className=" flex flex-col gap-y-3">
                    <p>Author Description</p>
                    <QuillEditor setValue={setValue} defaultValue={blog?.author?.description} id={'author.description'}/>
                </div>
                <div className=""></div>
                <div className=" flex flex-col gap-y-3">
                    <p>Blog Description</p>
                    <QuillEditor setValue={setValue} defaultValue={blog.description} id={'description'}/>
                </div>
            </div>
            <div className="mt-5 md:mt-10 flex flex-col gap-y-3">
                <p>Blog Image</p>
                <ImageInput oldImage={blog.img} setValue={setValue} fieldName={'img'}/>
            </div>
            <div className="flex flex-col gap-y-5 mt-5 md:mt-10">
                <p className="mt-5">Blog Details</p>
                <div className="flex flex-col gap-y-5">
                    {
                        !editState &&
                        <>
                            {
                                fields.map((field, index) => {
                                    return <div key={field.id} className='flex gap-x-3'>
                                        <div className="flex-grow">
                                            <PortfolioDetailsSection setValue={setValue} fieldName={'details'}
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
                                    <EditPortfolioDetailsSection setValue={setValue} fieldName={'details'}
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
            </div>
            {
                err !== '' && <p className='text-error my-5'>{err}</p>
            }
            <Button disabled={loading} radius={'none'} variant='bordered' className='w-fit border text-white my-5'
                type='submit'>
                {loading ? <Spinner color='white'/> : editState ? 'Update' : 'Add Blog'}
            </Button>
        </form>
    );
}

export default BlogDetailsForm;