import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";

const CustomModal = ({isOpen,onClose,title,cancelText="Cancel",okText="Update",children}) => {
  return (
    <div>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="blackAlpha.100" backdropFilter="blur(5px) hue-rotate(90deg)"/>
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              {cancelText}
            </Button>
            <Button  colorScheme="blue">{okText}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CustomModal;
