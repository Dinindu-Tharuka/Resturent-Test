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
import { Category } from "../../../../../Generics/interfaces";
import { REQUEST } from "../../../../../Generics/constants";
import useCategoryMutate from "../../../../../Hooks/Product/Category/useCategoryMutate";

interface Props {
  category: Category;
}
const ConfirmCategoryDelete = ({ category }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const toast = useToast();

  const categoryMutate = useCategoryMutate(() => {
    toast({
      title: "Category",
      description: "Category deleted successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }, REQUEST.DELETE);

  const onDelete = (category: Category) => {
    categoryMutate.mutate(category);
  };
  return (
    <>
      <IconButton
        onClick={onOpen}
        icon={<AiFillDelete />}
        aria-label="delete"
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Category
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards. All the
              category associated products will be deleted.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  onDelete(category);
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ConfirmCategoryDelete;
