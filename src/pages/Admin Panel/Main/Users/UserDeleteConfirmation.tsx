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
import { useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { User } from "../../../../Generics/interfaces";
import useMutateUsers from "../../../../Hooks/User/User/useMutatePageUsers";
import { REQUEST } from "../../../../Generics/constants";

interface Props {
  user: User;
}

const UserDeleteConfirmation = ({ user }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const toast = useToast()

  const userMutate = useMutateUsers(()=>{

    toast({
      title: 'User Deletion',
      description: "We've deleted user successfully.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }, REQUEST.DELETE)

  const onClick = ()=>{
    userMutate.mutate(user)
    onClose()
  }

  return (
    <>
      <IconButton
        icon={<AiFillDelete />}
        aria-label="user delete"
        onClick={onOpen}
        colorScheme="red"
      ></IconButton>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClick} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default UserDeleteConfirmation;
