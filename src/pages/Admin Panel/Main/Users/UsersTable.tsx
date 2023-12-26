import {
  Button,
  Container,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import useUsers from "../../../../Hooks/User/User/useUsers";
import { useState } from "react";
import AddUserAddModel from "./UserAdd/AddUserAddModel";
import { SIZES } from "../../../../Generics/constants";
import UserDeleteConfirmation from "./UserDeleteConfirmation";
import UserProfileShow from "./UserProfile/UserProfileShow";

const UsersTable = () => {
  const [page, setPage] = useState(1);
  const { data: users } = useUsers({ page: page, username: "" });

  const userCount = users?.count;
  let lastPage = 0;
  if (userCount !== undefined) {
    lastPage = Math.ceil(userCount / SIZES.USER_PAGE_PAGINATION_SIZE);
  }
  return (
    <VStack width="100%" >
      <Container overflow='auto' maxWidth='100%' minHeight='80vh' maxHeight='80vh'>
        
          <Table overflow='auto'>
            <Thead>
              <Tr>
                <Th>User Name</Th>
                <Th>Email</Th>
                <Th>Designation</Th>
                <Th></Th>
                <Th>
                  <HStack spacing={5}>
                    <AddUserAddModel />
                  </HStack>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {users?.results.map((user) => (
                <Tr>
                  <Td>{user.user_name}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    {user.is_superuser
                      ? "Admin"
                      : user.is_cashier
                      ? "Chasier"
                      : "Chef"}
                  </Td>
                  <Td>
                    <HStack spacing={5}>
                    <UserProfileShow user={user}/>
                    <UserDeleteConfirmation user={user}/>

                    </HStack>
                  </Td>
                  
                  
                </Tr>
              ))}
            </Tbody>
          </Table>
      </Container>

      <HStack position="absolute" top="90vh" right="40vw">
        <Button
          width={SIZES.ADMIN_PAGE_BUTTON_WIDTH}
          isDisabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>

        <Text>
          {page} of {lastPage}
        </Text>
        <Button
          width={SIZES.ADMIN_PAGE_BUTTON_WIDTH}
          isDisabled={page === lastPage}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </HStack>
    </VStack>
  );
};

export default UsersTable;
