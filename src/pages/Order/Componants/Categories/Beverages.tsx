import { Button, Input, SimpleGrid, Text } from "@chakra-ui/react";
import { COLOURS, SIZES } from "../../../../Generics/constants";
import { Category } from "../../../../Generics/interfaces";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {
  categories: Category[] | undefined;
  table?: string;
}

const Beverages = ({ categories, table }: Props) => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const isAvailble = categories?.filter((category) => !category.is_food).length;
  const navigate = useNavigate();

  const onClick = (category_id: number) => {
    navigate(`/dining/order/${table}/products/${category_id}`);
  };
  return (
    <>
      {isAvailble !== undefined && isAvailble > 0 ? (
        <>
          <Input
            placeholder="Search"
            onChange={(e) => setCategoryFilter(e.currentTarget.value)} marginBottom={5}
          />
          <SimpleGrid columns={5} spacing={2}>
            {categories
              ?.filter((category) => !category.is_food)
              .filter(category => category.title.startsWith(categoryFilter))
              .map((category, index) => (
                <Button
                  height={SIZES.CATEGORY_ITEM_HEIGHT}
                  onClick={() => onClick(category.id)}
                  key={index}
                  _hover={{
                    bg: COLOURS.TABLE_BUTTON_HOVER_COLOR,
                    color: COLOURS.MAIN_PAGE_WHITE,
                  }}
                >
                  {category.title}
                </Button>
              ))}
          </SimpleGrid>
        </>
      ) : (
        <Text>No Beverages</Text>
      )}
    </>
  );
};

export default Beverages;
