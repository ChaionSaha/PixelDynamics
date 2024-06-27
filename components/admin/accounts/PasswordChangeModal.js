import { useState } from 'react';

import ControlledPasswordInput from '@/components/Shared/ControlledPasswordInput';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react";
import axios from 'axios';
import { useForm } from 'react-hook-form';

const PasswordChangeModal = ({ isOpen, onOpenChange, onClose, currentUser }) => {
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    })

    const handleFormSubmit = (formData) => {
        const { oldPassword, newPassword, confirmPassword } = formData;

        if(oldPassword.trim() === '' || newPassword.trim() === '' || confirmPassword.trim() === '') {   
            setErr('Please fill in all fields');
            return;
        }

        if(newPassword !== confirmPassword) {
            setErr('Passwords do not match');
            return;
        }

        setLoading(true);

        axios.post('/api/admin/accounts/change-password', formData)
            .then(res => {
                setErr('');
                reset();
                onClose();
            })
            .catch(({ response }) => setErr(response?.data?.message))
            .finally(() => setLoading(false));
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isDismissable={false} hideCloseButton={true} onOpenChange={onOpenChange} classNames={{
            base: 'bg-admin-primary text-base-200'
        }}>
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-col gap-1">
                            Change Password for {currentUser?.name}
                    </ModalHeader>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <ModalBody>
                            <div  className='flex flex-col gap-y-5'>
                                <ControlledPasswordInput
                                    name={'oldPassword'}
                                    control={control}
                                    label={'Old Password'}
                                />
                                <ControlledPasswordInput
                                    name={'newPassword'}
                                    control={control}
                                    label={'New Password'}
                                />
                                <ControlledPasswordInput
                                    name={'confirmPassword'}
                                    control={control}
                                    label={'Confirm New Password'}
                                />

                            </div>
                            {
                                err &&
                                    <p className='text-error mt-5'>{err}</p>
                            }
                        </ModalBody>
                        <ModalFooter>
                                
                            {
                                !loading &&
                                <Button color="danger" radius={'none'} variant="light" onClick={() => {
                                    setErr('');
                                    reset();
                                    onClose();
                                }}>
                                    Close
                                </Button>
                            }
                            <Button type='submit' disabled={loading} color="primary" radius={'none'} >
                                {loading ? <Spinner color='white'/> :  'Update' }
                            </Button>
                        </ModalFooter>
                    </form>
                </>
            </ModalContent>
        </Modal>
    );
};

export default PasswordChangeModal;