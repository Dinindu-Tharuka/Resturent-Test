import { Container, SimpleGrid, Text } from "@chakra-ui/react";
import useFloors from "../../Hooks/Floor/useFloors";
import useAllTables from "../../Hooks/Floor/useAllTables";
import TableButton from "../Dining/TableButton";

const KitchenOrderShow = () => {
  const { data: floors } = useFloors();
  const { data: tables } = useAllTables();
  return (
    <Container
      maxWidth="100vw"
      minWidth="100vw"
      maxHeight="100vh"
      minHeight="100vh"
    >
      {floors?.map((floor) => (
        <>
          <Text>{floor.floor_number} Floor</Text>
          <SimpleGrid columns={5} spacing={2}>
            {tables
              ?.filter((table) => table.floor_id === floor.id)
              .filter(table => table.is_place_order)
              .map((table) => (
                <TableButton table={table} />
              ))}
          </SimpleGrid>
        </>
      ))}
    </Container>
  );
};

export default KitchenOrderShow;
