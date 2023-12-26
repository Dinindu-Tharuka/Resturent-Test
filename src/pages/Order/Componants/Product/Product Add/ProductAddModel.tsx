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
import ProductAddForm from "./ProductAddForm";
import { MdOutlineAddBox } from "react-icons/md";

interface Props {
  category_id: number;
}
const ProductAddModel = ({ category_id }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        icon={<MdOutlineAddBox />}
        aria-label="category add"
        colorScheme="green"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProductAddForm category_id={category_id} onClose={onClose}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductAddModel;
