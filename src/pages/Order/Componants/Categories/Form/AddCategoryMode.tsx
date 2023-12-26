import { IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, useDisclosure } from "@chakra-ui/react"
import AddCategoryForm from "./AddCategoryForm"
import { MdOutlineAddBox } from "react-icons/md"
import ShowAllCategories from "./ShowAllCategories"


const AddCategoryMode = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
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
          <ModalHeader>Add Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems='start'>
            <AddCategoryForm/>

            <ShowAllCategories/>

            </VStack>
          </ModalBody>

          
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddCategoryMode