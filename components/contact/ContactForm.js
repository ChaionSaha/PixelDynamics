import React from 'react';
import Title from "@/components/Shared/title";
import {Input, Select, SelectItem, Textarea} from "@nextui-org/react";
import {InlineWidget} from "react-calendly";

const ContactForm = ({services, calendlyLink}) => {
    return (
        <div className="flex-grow">
            <Title title='Contact'/>
            <div>
                <p className="md:text-6xl text-4xl  font-bold text-center mt-20">Contact</p>
                <p className='text-center md:text-lg lg:text-xl font-semibold mt-3 px-7 md:px-0 md:w-[40%] mx-auto'>Contact
                    us
                    for Inquires
                    and We
                    are there for
                    any help
                    regarding design.</p>


                <form className='mx-auto  flex flex-col mt-20 gap-y-5 px-7 md:px-0 md:w-[60%]'>
                    <Input type="text"
                           radius={'none'}
                           variant={'bordered'}
                           label="Name"
                           size={'lg'}
                           classNames={{
                               input: "border-black text-lg",
                               inputWrapper: "border-base-200 focus:border-black border",

                           }}
                    />
                    <Input type="email"
                           radius={'none'}
                           variant={'bordered'}
                           label="Email"
                           size={'lg'}
                           classNames={{
                               input: "border-black text-lg",
                               inputWrapper: "border-base-200 focus:border-black border",

                           }}
                    />

                    <Select
                        label="Select a service"
                        variant={'bordered'}
                        size={'lg'}
                        radius={'none'}
                        classNames={{

                            trigger: 'border-base-200 offset-0 border',

                        }}
                    >

                        {services.map((s, i) => (
                            <SelectItem key={i} value={s.title}>
                                {s.title}
                            </SelectItem>
                        ))}
                    </Select>


                    <Textarea
                        label="Message"
                        variant={'bordered'}
                        size={'lg'}
                        radius={'none'}
                        minRows={5}
                        classNames={{
                            inputWrapper: 'border-base-200 focus:border-black border',
                        }}
                    />
                    <button className="btn btn-primary btn-lg text-2xl text-white rounded-none">Send</button>

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