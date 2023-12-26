import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    useDisclosure,
  } from "@chakra-ui/react";
  import { COLOURS } from "../../../../Generics/constants";
  import { Order } from "../../../../Generics/interfaces";
import KitchenBillShowView from "./KitchenBillShowView";
  
  interface Props {
    order?: Order;
  }

const KichenBillModel = ({ order}: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        width="50%"
        onClick={onOpen}
        bg={COLOURS.OK_COLOUR}
        color={COLOURS.MAIN_PAGE_WHITE}
        _hover={{
          color: "black",
          bg: COLOURS.HOVER_BUTTON_COLOR,
        }}
      >
        Kitchen Bill
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <KitchenBillShowView order={order}/>
           
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default KichenBillModel