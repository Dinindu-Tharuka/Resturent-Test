import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { COLOURS, REQUEST } from "../../../Generics/constants";
import { Order, Table } from "../../../Generics/interfaces";
import useOrderMutate from "../../../Hooks/Orders/useOrderMutate";
import { useNavigate } from "react-router-dom";
import useAllTables from "../../../Hooks/Floor/useAllTables";
import useAllTableMutate from "../../../Hooks/Floor/useAllTableMutate";

interface Props{
    order:Order
}

const OrderCancelConfirmation = ({ order }:Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const navigate = useNavigate()

  ///
  const toast = useToast()

  // all tables
  const { data: tables} = useAllTables()
  const currentTable = tables?.find(table => table.table_no === order?.table)
  const allTableMutate = useAllTableMutate(()=>{}, REQUEST.PUT)

  const orderMuatate = useOrderMutate(()=>{
    if (order.is_takeway){
      navigate('/')
    }else{
      navigate('/dining')

    }

    toast({
        title: 'Cancel Order',
        description: "Order Canceled Successfull.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
  }, REQUEST.DELETE)

  const onClickCancelOrder = ()=>{

    orderMuatate.mutate(order)

    const newTable = {
      ...currentTable,
      is_place_order:false
    } as Table
    allTableMutate.mutate(newTable)

  }
  return (
    <>
      <Button
        onClick={onOpen}
        width="50%"
        bg={COLOURS.CANCEL_COLOR}
        color={COLOURS.MAIN_PAGE_WHITE}
        _hover={{
            color:'black',
            bg:COLOURS.HOVER_BUTTON_COLOR
        }}
      >
        Cancel
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Cancel Order</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to cancel the order? This action can't be undo
            after cancelling the order.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={onClickCancelOrder}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OrderCancelConfirmation;
