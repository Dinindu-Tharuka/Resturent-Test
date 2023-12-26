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
import { Floor } from "../../../../Generics/interfaces";
import useMutateFloors from "../../../../Hooks/Floor/useMutateFloors";
import { REQUEST } from "../../../../Generics/constants";

interface Props{
    floor:Floor
}

const FloorDeleteConfirmation = ({ floor }:Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const toast = useToast()

  const floorMutate = useMutateFloors(()=>{
    toast({
        title: 'Floor Delete',
        description: "Floor Deleted Successfully.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    onClose()
  },()=>{

    toast({
        title: 'Floor Delete',
        description: "Floor Deleted Not Successfully.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })

  }, REQUEST.DELETE)

  const onConfirm = ()=>{
   floorMutate.mutate(floor)
  }
  return (
    <>
      <IconButton
        aria-label="delete"
        icon={<AiFillDelete />}
        onClick={onOpen}
        colorScheme="red"
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Floor
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

export default FloorDeleteConfirmation;
