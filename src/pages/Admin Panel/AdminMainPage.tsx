import { Grid, GridItem, HStack, IconButton, Text } from "@chakra-ui/react";
import SidePanel from "./SidePanel/SidePanel";
import { Outlet, useNavigate } from "react-router-dom";
import { COLOURS } from "../../Generics/constants";
import { IoHomeSharp } from "react-icons/io5";
import SignOutButton from "./SidePanel/componants/SignOutButton";

const AdminMainPage = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/");
  };
  return (
    <Grid templateAreas={`"nav nav" "aside main"`}>
      <GridItem area="nav" height="10vh">
        <HStack justifyContent="center" alignItems="center">
          <Text fontSize={{lg:40, base:20}} fontWeight='bold'>Admin Panel</Text>
        </HStack>

        <HStack position="absolute" left="93vw" top='2vh'>
          <IconButton
            bg={COLOURS.BACKGROUND_COLOR}
            aria-label=""
            icon={<IoHomeSharp />}
            alignSelf="self-start"
            onClick={onClick}
          />

          <SignOutButton />
        </HStack>
      </GridItem>
      <GridItem area="aside" width="25vw" height="90vh">
        <SidePanel />
      </GridItem>
      <GridItem area="main" width="75vw" height="90vh">
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default AdminMainPage;
