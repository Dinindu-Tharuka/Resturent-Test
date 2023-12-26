import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, IconButton, useDisclosure, useToast } from "@chakra-ui/react";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import useOrderMutate from "../../../../../Hooks/Orders/useOrderMutate";
import { REQUEST } from "../../../../../Generics/constants";
import { Order } from "../../../../../Generics/interfaces";

interface Props{
    order:Order
}

const OrderDeleteConfirm = ({ order }:Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  const toast = useToast()

  // mutating orders
  const orderMutate = useOrderMutate(()=>{
    onClose()
    toast({
        title: 'Order Delte.',
        description: "Order Delete Successfully.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
  }, REQUEST.DELETE)
  const onDeleteConfirm = ()=>{
    orderMutate.mutate(order)

  }
  return (
    <>
      <IconButton icon={<AiFillDelete/>} aria-label="delete" onClick={onOpen} colorScheme="red"/>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Order
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDeleteConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default OrderDeleteConfirm;
