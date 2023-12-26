import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import RevenueReportShow from "./RevenueReportShow"
import { Order } from "../../../../../Generics/interfaces"

interface Props{
  orders:Order[]
}
const RevenueShowModel = ({ orders }:Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen} width='100%'>Revenue Report</Button>

      <Modal isOpen={isOpen} onClose={onClose} size='custom'>
        <ModalOverlay />
        <ModalContent css={{
          width:"600px"
        }}>
          
          <ModalCloseButton />
          <ModalBody>
            <RevenueReportShow orders={orders}/>
          </ModalBody>          
        </ModalContent>
      </Modal>
    </>
  )
}

export default RevenueShowModel