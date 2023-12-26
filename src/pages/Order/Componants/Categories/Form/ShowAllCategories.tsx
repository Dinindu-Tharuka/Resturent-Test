import { Container, Input, Table, Tbody, Th, Tr } from "@chakra-ui/react";
import useCategories from "../../../../../Hooks/Product/Category/useCategories";
import ConfirmCategoryDelete from "./ConfirmCategoryDelete";
import { useState } from "react";

const ShowAllCategories = () => {
  const { data: categories } = useCategories();
  const [categoryFilter, setCategoryFilter] = useState("");

  return (
    <Container maxHeight="50vh" minHeight="60vh" overflow="auto">
      <Input
        placeholder="Serach"
        onChange={(e) => setCategoryFilter(e.currentTarget.value)}
      />
      <Table>
        <Tbody>
          {categories
            ?.filter((category) => category.title.startsWith(categoryFilter))
            .map((category, index) => (
              <Tr key={index}>
                <Th>{category.title}</Th>
                <Th>
                  <ConfirmCategoryDelete category={category} />
                </Th>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Container>
  );
};

export default ShowAllCategories;
