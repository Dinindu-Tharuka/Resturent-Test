import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Product } from "../../../../../Generics/interfaces";
import ProductReportShow from "./ProductReportShow";

interface Props {
  products: Product[];
}

const ProductShowModel = ({ products }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} width='100%'>Products Report</Button>

      <Modal isOpen={isOpen} onClose={onClose} size='custom'>
        <ModalOverlay />
        <ModalContent css={{
          width:"700px"
        }}>
          <ModalCloseButton />
          <ModalBody>
            <ProductReportShow products={products} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductShowModel;
