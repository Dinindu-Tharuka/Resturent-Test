import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import useProductsMutate from "../../../../Hooks/Product/Product/useProductsMutate";
import { REQUEST } from "../../../../Generics/constants";
import { Product } from "../../../../Generics/interfaces";

interface Props{
    product:Product
}

const ProductItemDeleteConfirmation = ({ product}:Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const toast = useToast()

  const productMutate = useProductsMutate(()=>{
    toast({
        title: 'Product',
        description: "Product delete successfully.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      onClose()
  }, REQUEST.DELETE, product.category_id)

  const onConfirm = ()=>{
    productMutate.mutate(product)
  }
  return (
    <>
      <IconButton aria-label="delete" icon={<AiFillDelete/>} onClick={onOpen} colorScheme="red"/>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ProductItemDeleteConfirmation;
