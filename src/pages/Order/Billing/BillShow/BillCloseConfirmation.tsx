import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure, useToast } from '@chakra-ui/react'
import React from 'react'
import { Order, Table } from '../../../../Generics/interfaces'
import { REQUEST } from '../../../../Generics/constants'
import useOrderMutate from '../../../../Hooks/Orders/useOrderMutate'
import { useNavigate } from 'react-router-dom'
import useAllTables from '../../../../Hooks/Floor/useAllTables'
import useAllTableMutate from '../../../../Hooks/Floor/useAllTableMutate'

interface Props{
    order?:Order
}

const BillCloseConfirmation = ({ order }:Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef(null)
    const navigate = useNavigate()
    const toast = useToast()

    // all tables
    const { data: tables} = useAllTables()
    const currentTable = tables?.find(table => table.table_no === order?.table)
    const allTableMutate = useAllTableMutate(()=>{}, REQUEST.PUT)

    const orderMutate = useOrderMutate(()=>{
        if (order?.is_takeway){
            navigate('/')

        }else{
            navigate('/dining')
        }

        toast({
            title: 'Order',
            description: "Order Successfully closed.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
    }, REQUEST.UPDATE)

    const onConfirmOrder = ()=>{
        const changedOrder = {
            ...order,
            is_order_open:false
        } as Order

        orderMutate.mutate(changedOrder)

        const newTable = {
          ...currentTable,
          is_place_order:false
        } as Table
        allTableMutate.mutate(newTable)

    }
  
  return (
    <>
      <Button colorScheme='red' onClick={onOpen} width='50%'>
        Close Order
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Order Close
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards. 
            </AlertDialogBody>

            <AlertDialogFooter >
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={()=>{
                onClose()
                onConfirmOrder()
                }} ml={3}>
                confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default BillCloseConfirmation