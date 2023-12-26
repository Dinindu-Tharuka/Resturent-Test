import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { IoIosPersonAdd } from "react-icons/io";
import UserAddForm from "./UserAddForm";

const AddUserAddModel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        colorScheme="red"
        aria-label="Add User"
        icon={<IoIosPersonAdd />}
        onClick={onOpen}
      />
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UserAddForm onSuccess={onClose}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddUserAddModel;
