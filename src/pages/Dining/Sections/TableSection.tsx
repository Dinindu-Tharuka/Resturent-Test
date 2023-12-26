import { HStack, SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Table } from "../../../Generics/interfaces";
import TableButton from "../TableButton";

interface Props {
  tables: Table[];
}

const TableSection = ({ tables }: Props) => {
  return (
    <motion.div
      initial={{ width:'5vw', height:'5vh' }}
      animate={{ width:'100%', height:'100%', transition: { duration: 1 } }}
      exit={{ opacity: 0 }}
    >
      <HStack justifyContent="center" height="100%">
        <SimpleGrid
          columns={5}
          spacing={2}
          height="100%"
          alignItems="flex-start"
        >
          {tables.map((table, index) => (
            <TableButton table={table} key={index} />
          ))}
        </SimpleGrid>
      </HStack>
    </motion.div>
  );
};

export default TableSection;
