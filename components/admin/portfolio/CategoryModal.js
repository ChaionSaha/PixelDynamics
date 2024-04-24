import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react";

const CategoryModal = ({
    isOpen,
    onOpenChange,
    closeModal,
    setInput,
    loading,
    errorMessage,
    setErrorMessage,
    value, editState
}) => {
    return <Modal isOpen={isOpen} onOpenChange={onOpenChange} classNames={{
        base: 'bg-admin-primary text-base-200'
    }} hideCloseButton={true}>
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader
                        className="flex flex-col gap-1">{editState ? 'Edit Category' : "Add Category"}</ModalHeader>
                    <ModalBody>
                        <Input
                            isRequired
                            type="text"
                            label="Category Name"
                            variant='bordered'
                            size="lg"
                            classNames={{
                                base: 'text-white',
                                inputWrapper: 'rounded-none border',
                                label: 'text-white'
                            }}
                            value={value}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        {
                            errorMessage &&
                            <p className='text-error'>{errorMessage}</p>
                        }
                    </ModalBody>
                    <ModalFooter>
                        {
                            !loading &&
                            <Button color="danger" radius={'none'} variant="light" onClick={() => {
                                setErrorMessage('');
                                onClose();
                            }}>
                                Close
                            </Button>
                        }
                        <Button disabled={loading} color="primary" radius={'none'} onClick={() => closeModal(onClose)}>
                            {loading ? <Spinner color='white'/> : editState ? 'Update' : 'Save'}
                        </Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal>
}

export default CategoryModal;