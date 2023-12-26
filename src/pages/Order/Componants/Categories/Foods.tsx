import { Button, Input, SimpleGrid, Text } from "@chakra-ui/react";
import { Category } from "../../../../Generics/interfaces";
import { COLOURS, SIZES } from "../../../../Generics/constants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {
  categories: Category[] | undefined;
  table?: string;
}

const Foods = ({ categories, table }: Props) => {
  const isAvailble = categories?.filter((category) => category.is_food).length;
  const [categoryFilter, setCategoryFilter] = useState("");

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
            onChange={(e) => setCategoryFilter(e.currentTarget.value)}
            marginBottom={5}
          />
         
            <SimpleGrid columns={{ lg: 5, base: 3 }} spacing={2}>
              {categories
                ?.filter((category) => category.is_food)
                .filter((category) => category.title.startsWith(categoryFilter))
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
        <Text>No Foods</Text>
      )}
    </>
  );
};

export default Foods;
