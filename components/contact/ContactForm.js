import { ChevronDownIcon } from "@/assets/CustomIcons/CustomIcon";
import Title from "@/components/Shared/title";
import { Button, Input, Select, SelectItem, Spinner, Textarea } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { InlineWidget } from "react-calendly";
import { Controller, useForm } from "react-hook-form";

const ContactForm = ({ services, calendlyLink }) => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            email: "",
            service: "",
            message: "",
        }
    })

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');
    const [success, setSucess] = useState(false);

    const submitData = async (formData) => {
        setErr('');
        setSucess(false);
        setLoading(true);
        axios.post('/api/send-contact-message', formData)
            .then(() => { setSucess(true); })
            .catch(err => {
                setErr('Something wrong happend!');
            })
            .finally(() => setLoading(false));
    }


    return (
        <div className="flex-grow">
            <Title title='Contact'/>
            <div>
                <p className="md:text-6xl text-4xl laptop:text-5xl font-bold text-center mt-20">
                    Contact
                </p>
                <p className='text-center md:text-lg lg:text-xl laptop:text-lg font-semibold mt-3 px-7 md:px-0 md:w-[40%] mx-auto'>Contact
                    us
                    for Inquires
                    and We
                    are there for
                    any help
                    regarding design.
                </p>


                <form className='mx-auto  flex flex-col mt-20 gap-y-5 px-7 md:px-0 md:w-[60%]' onSubmit={handleSubmit(submitData)}>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) =>
                            <Input type="text"
                                radius={'none'}
                                variant={'bordered'}
                                placeholder="Name"
                                size={'lg'}
                                value={value}
                                onChange={onChange}
                                classNames={{
                                    input: "border-black text-lg",
                                    inputWrapper: "border-base-200 focus:border-black border",
                                }}
                            />}
                    />
                    
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/'
                        }}
                        render={({ field: { onChange, value } }) =>
                            <Input type="email"
                                radius={'none'}
                                variant={'bordered'}
                                // label="Email"
                                placeholder="Email"
                                size={'lg'}
                                value={value}
                                onChange={onChange}
                                classNames={{
                                    input: "border-black text-lg",
                                    inputWrapper: "border-base-200 focus:border-black border",

                                }}
                            />
                        }
                    />
                    

                    <Controller
                        name="service"
                        control={control}
                        render={({ field: { onChange, value } }) =>
                            <Select
                                // label="Select a service"
                                placeholder="Select a service"
                                variant={'bordered'}
                                size={'lg'}
                                radius={'none'}
                                value={[value]}
                                onChange={onChange}
                                selectorIcon={<ChevronDownIcon className='w-10 h-10'/>}
                                classNames={{
                                    trigger: 'border-base-200 offset-0 border',
                                    value: 'text-black',
                                    selectorIcon: 'w-5 h-4',
                                    popoverContent: 'rounded-none'
                                }}
                            >
                                {services.map((s, i) => (
                                    <SelectItem key={s.title} value={s.value} className="hover:rounded-none" classNames={{
                                        base: 'data-[selected=true]:rounded-none rounded-none data-[hover=true]:bg-[#ebebeb]'
                                    }}>
                                        {s.title}
                                    </SelectItem>
                                ))}
                            </Select>
                        }
                    />

                    
                    <Controller
                        control={control}
                        name="message"
                        render={({ field: { onChange, value } }) =>
                            <Textarea
                                // label="Message"
                                placeholder="Message"
                                variant={'bordered'}
                                size={'lg'}
                                radius={'none'}
                                value={value}
                                onChange={onChange}
                                minRows={5}
                                classNames={{
                                    inputWrapper: 'border-base-200 focus:border-black border',
                                }}
                            />}
                    />

                    <div className="w-full">
                        {
                            err &&
                            <p className="text-error mb-2">{err}</p>
                        }
                        <Button disabled={loading || success} radius={'none'} variant='bordered' className={`w-full ${success ? 'bg-white font-bold' : 'bg-black'} hover:bg-white hover:border-black hover:text-black py-7 border ${success ? 'text-success':'text-white'} text-xl`} 
                            type='submit'>
                            {loading ? <Spinner color='white'/> : success ? 'Sent!' :  'Send'}
                        </Button>
                    </div>

                </form>
            </div>

            {/* Calendly */}
            <div className="calendly mt-40 lg:w-[80%] mx-auto">
                <InlineWidget
                    url={calendlyLink}
                    styles={{
                        height: '100vh',
                    }}
                    pageSettings={{
                        hideEventTypeDetails: false,
                        hideLandingPageDetails: true,
                    }}

                />
            </div>
        </div>
    );
};

export default ContactForm;