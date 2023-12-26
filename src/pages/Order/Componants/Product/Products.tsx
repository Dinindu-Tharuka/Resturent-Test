import { useParams } from "react-router-dom";
import { useProduct } from "../../../../Hooks/Product/Product/useProducts";
import { Container, Flex, FormLabel, HStack, SimpleGrid } from "@chakra-ui/react";
import ProductItem from "./ProductItem";
import ProductAddModel from "./Product Add/ProductAddModel";
import useUserMe from "../../../../Hooks/User/useUserMe";
import UserMeContext from "../../../../Contexts/UserMe";

const Products = () => {
  const { id } = useParams();

  const { data: products } = useProduct({
    category_id: id !== undefined ? parseInt(id) : 0,
  });

  const { userMe } = useUserMe();

  return (
    <UserMeContext.Provider value={userMe}>
      <>
        <Flex position="absolute" zIndex={2} left={{lg:"55vw", base: '35vw'}} top="5vh">
          <HStack>
          <FormLabel>Add Product</FormLabel>
          <ProductAddModel category_id={id ? parseInt(id) : 0} />
          </HStack>
        </Flex>
        <Container
          maxHeight="73vh"
          minHeight="73vh"
          minWidth="100%"
          overflow="auto"
          marginTop="5vh"
        >
          <SimpleGrid columns={{ base: 3, lg: 5 }}>
            {products?.map((product, index) => (
              <ProductItem product={product} key={index} />
            ))}
          </SimpleGrid>
        </Container>
      </>
    </UserMeContext.Provider>
  );
};

export default Products;
