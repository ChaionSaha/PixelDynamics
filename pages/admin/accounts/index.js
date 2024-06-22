import PasswordChangeModal from '@/components/admin/accounts/PasswordChangeModal';
import DeleteCategoryModal from '@/components/admin/portfolio/DeleteCategoryModal';
import AdminPageTitle from '@/components/Shared/AdminPageTitle';
import SharedLayout from "@/components/Shared/SharedLayout";
import Title from "@/components/Shared/title";
import { getDatabase } from '@/db/mongoConnection';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { useState } from 'react';

const Index = ({ users, currentUser }) => {
    const [loggedUser, setLoggedUser] = useState(JSON.parse(currentUser));
    const [targetUser, setTargetUser] = useState({});
    const { onOpen, onOpenChange, isOpen } = useDisclosure();
    const { onOpen: onPasswordChangeOpen, onOpenChange: onPasswordChangeOpenChange, isOpen: isPasswordChangeOpen, onClose: onPasswordChangeClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');
    const [tableData, setTableData]=useState(users);

    const handleDelete =  (user) => {
        setTargetUser(user);
        onOpen();
    }

    const handleCloseModal = (onClose) => {
        setErr('');
        setLoading(false);

        axios.delete('/api/admin/accounts/delete-user?email=' + targetUser.email)
            .then(res => { setTableData(res.data); onClose(); })
            .catch(({ response }) => setErr(response?.data?.message))
            .finally(() => setLoading(false));
    }
    
    
    return (
        <SharedLayout>
            <div>
                <Title title='Admin Accounts'/>
                <AdminPageTitle title={'Admin Accounts'} />
                <div className="w-full flex lg:justify-end px-10 mt-10">
                    <Button
                        color='secondary'
                        variant='bordered'
                        size='lg'
                        radius='none'
                        className='border'
                        onPress={() => {
                            onPasswordChangeOpen();
                        }}>
                        Change Password
                    </Button>
                </div>
                <div className="px-10 my-10">
                    <Table
                        tableData={tableData}
                        currentUser={loggedUser}
                        actionOnDelete={handleDelete}
                        setTableData={setTableData}
                    />
                </div>
                <DeleteCategoryModal
                    onOpenChange={onOpenChange}
                    isOpen={isOpen}
                    name={targetUser.name}
                    title={'Delete User'}
                    closeModal={handleCloseModal}
                    loading={loading}
                    errorMessage={err}
                    setErrorMessage={setErr}
                />
                <PasswordChangeModal
                    isOpen={isPasswordChangeOpen}
                    onOpenChange={onPasswordChangeOpenChange}
                    onClose={onPasswordChangeClose}
                    currentUser={users.find(u => u.email === loggedUser.email)}
                />
            </div>
        </SharedLayout>
    );
};

export default Index;

export async function getServerSideProps({req, res}) {
    const db = await getDatabase();
    const users = await db.collection('users').find().project({ _id: 0, password: 0 }).toArray();
    const session = await getServerSession(req, res, authOptions);

    if (!session)
        return {
            redirect: {
                destination: '/admin/auth/login',
                permanent: false,
            }
        }

    return {
        props: {
            users, currentUser: JSON.stringify(session?.user)
        }
    }
}

const Table = ({ tableData = [], currentUser, actionOnDelete, setTableData }) => {
    const { isOpen, onOpenChange, onOpen } = useDisclosure();
    const [targetUser, setTargetUser] = useState({});

    return <div className="overflow-x-auto bg-admin-secondary p-5 mb-5">
        <table className="table table-zebra table-lg  rounded-none">
            <thead className='bg-admin-primary'>
                <tr className='border-0'>
                    <th>SL.</th> 
                    <th>Name</th>
                    <th>Email</th>
                    <th>Approved</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    tableData.map((t, i) =>
                        <tr className='border-0' key={i}>
                            <td>{i + 1}</td>
                            <td>{t.name}</td>
                            <td>{t.email}</td>
                            <td>{t.isApproved ? 'Yes' : 'No'}</td>
                            <td>
                                {
                                    currentUser.email === t.email ?
                                        <Chip color="primary">Current User</Chip>  :
                                        <>
                                            {
                                                t.isApproved ? <button className='btn btn-sm text-lg text-warning btn-ghost'
                                                    onClick={() => { setTargetUser(t); onOpen() }}>
                                                    <i className='bi bi-file-text'></i>
                                                </button>:<button className='btn btn-sm text-lg text-warning btn-ghost'
                                                    onClick={() => { setTargetUser(t); onOpen() }}>
                                                    <i className='bi bi-pencil-square'></i>
                                                </button>
                                            }
                                            
                                            <button className='btn btn-sm text-lg text-error btn-ghost'
                                                onClick={() => {actionOnDelete(t)}}>
                                                <i className='bi bi-trash'></i>
                                            </button>
                                        </>
                                }
                                
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
        <ApprovalModal
            onOpenChange={onOpenChange}
            isOpen={isOpen}
            targetUser={targetUser}
            setTableData={setTableData}
        />
    </div>
}

const ApprovalModal = ({targetUser, isOpen, onOpenChange, setTableData}) => {
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const handleApproveUser = (onClose) => {
        setLoading(true);
        setErr('');
        axios(`/api/admin/accounts/approve-account?email=${targetUser.email}`)
            .then(res => {
                setTableData(res.data);
                onClose();
            })
            .catch(({ response }) => setErr(response?.data?.message))
            .finally(() => setLoading(false));
    }

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} classNames={{
                base: 'bg-admin-primary text-base-200'
            }} hideCloseButton={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{targetUser.isApproved? 'User Details' : 'Update User'}</ModalHeader>
                            <ModalBody className='flex flex-col gap-y-5'>
                                <div className="">
                                    <p>Name:</p>
                                    <p className='text-xl font-semibold'>{targetUser.name}</p>
                                </div>
                                <div className="">
                                    <p>Email:</p>
                                    <p className='text-xl font-semibold'>{targetUser.email}</p>
                                </div>
                                <div className="">
                                    <p>Approved:</p>
                                    <p className='text-xl font-semibold'>{targetUser.isApproved ? 'Yes' : 'No'}</p>
                                </div>
                                {
                                    err &&
                                    <p className='text-error'>{err}</p>
                                }
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" radius='none' variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                {
                                    !targetUser.isApproved && 
                                        <Button color="success" disabled={loading} radius='none' onPress={handleApproveUser}>
                                            {loading ? <Spinner color='white'/> : 'Approve'}
                                        </Button>
                                }
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}