import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner} from "@nextui-org/react";

const CategoryModal = ({
                           isOpen,
                           onOpenChange,
                           closeModal,
                           title,
                           loading,
                           errorMessage,
                           setErrorMessage,
                           name
                       }) => {
    return <Modal isOpen={isOpen} onOpenChange={onOpenChange} classNames={{
        base: 'bg-admin-primary text-base-200'
    }} hideCloseButton={true}>
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                    <ModalBody>
                        <p>You are about to delete this item: </p>
                        <p className='text-xl font-semibold'>{name}</p>
                        {
                            errorMessage &&
                            <p className='text-error'>{errorMessage}</p>
                        }
                    </ModalBody>
                    <ModalFooter>
                        {
                            !loading &&
                            <Button color="success" radius={'none'} variant="light" onClick={() => {
                                setErrorMessage('');
                                onClose();
                            }}>
                                Close
                            </Button>
                        }
                        <Button disabled={loading} color="danger" radius={'none'} onClick={() => closeModal(onClose)}>
                            {loading ? <Spinner color='white'/> : 'Delete'}
                        </Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal>
}

export default CategoryModal;