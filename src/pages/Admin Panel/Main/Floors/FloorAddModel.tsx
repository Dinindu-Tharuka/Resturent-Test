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
import { MdOutlineAddBox } from "react-icons/md";
import FloorAddForm from "./FloorAddForm";

const FloorAddModel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label="add-floors"
        onClick={onOpen}
        icon={<MdOutlineAddBox />}
        colorScheme="green"
      ></IconButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Floor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FloorAddForm onClose={onClose}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FloorAddModel;
