import { Flex, HStack, IconButton, Text, VStack } from "@chakra-ui/react";

import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { useState } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { COLOURS } from "../../Generics/constants";
import { useNavigate } from "react-router-dom";
import OrderContext from "../../Contexts/Orders/OrdersContexts";
import useOrders from "../../Hooks/Orders/useOrders";
import useTables from "../../Hooks/Floor/useTables";
import useFloors from "../../Hooks/Floor/useFloors";
import TableSection from "./Sections/TableSection";

const Dining = () => {
  const [floorNo, setFloorNo] = useState(0);
  // const floors = ["First Floor", "Second Floor", "Second Floor"];
  const navigate = useNavigate();


  // for fetch tables
  const { data: floors } = useFloors();
  const numOfFloors = floors?.length;
  const { data: tables } = useTables({ floor_id: floors ? floors[floorNo]?.id : 0 });

  const { data: orders } = useOrders();

  const onClick = () => {
    navigate("/");
  };
  return (
    <OrderContext.Provider value={{ orders }}>
      {numOfFloors ? (
        <VStack width="100vw" height="100vh" bg={COLOURS.BACKGROUND_COLOR}>
          <Flex width="100vw">
            <IconButton
              bg={COLOURS.BACKGROUND_COLOR}
              aria-label=""
              icon={<IoHomeSharp />}
              alignSelf="self-start"
              onClick={onClick}
            />
            <Text
              fontWeight="bold"
              alignSelf="center"
              position="absolute"
              left="50vw"
            >
              {floors ? floors[floorNo].floor_number : 0} Floor
            </Text>
          </Flex>
          <HStack bg={COLOURS.BACKGROUND_COLOR} height="90vh">
            <IconButton
              bg={COLOURS.BACKGROUND_COLOR}
              aria-label=""
              icon={<GrPrevious />}
              height="100%"
              isDisabled={!(floorNo > 0)}
              onClick={() => setFloorNo(floorNo - 1)}
            />

            {tables ? (
              <TableSection tables={tables} />
            ) : (
              <Text color="red">No Tables</Text>
            )}

            <IconButton
              bg={COLOURS.BACKGROUND_COLOR}
              aria-label=""
              icon={<GrNext />}
              isDisabled={!(floorNo < (numOfFloors ? numOfFloors-1 : 0))}
              height="100%"
              onClick={() => setFloorNo(floorNo + 1)}
            />
          </HStack>
        </VStack>
      ) : (
        <Flex justifyContent='center' alignItems='center' height='100vh'>
          <Text fontSize={100}>No Floors Created</Text>

        </Flex>
      )}
    </OrderContext.Provider>
  );
};

export default Dining;
