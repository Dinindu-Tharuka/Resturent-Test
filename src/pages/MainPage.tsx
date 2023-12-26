import { Box, Button, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import restuarent from "../assets/images/restuarent.jpg";
import { COLOURS, SIZES } from "../Generics/constants";
import { Link } from "react-router-dom";
import {  motion } from "framer-motion";
import AdminPanelButton from "./Admin Panel/AdminPanelButton";
import { useEffect } from "react";
import SignOutButton from "./Admin Panel/SidePanel/componants/SignOutButton";
import useUserMe from "../Hooks/User/useUserMe";
import KitchenShowModel from "./Kitchen/KitchenShowModel";

const MainPage = () => {
  const { userMe } = useUserMe();

  useEffect(() => {
    if (localStorage.getItem("firstTime") === "true") {
      window.location.reload();
      localStorage.setItem("firstTime", "false");
    }
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{ opacity: 0 }}
    >
      <Flex width="100%" height="100%">
        {/* Background Image */}
        

        <Box
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image src={restuarent} objectFit="fill" width="100%" height="100%" />
        </Box>

        {/* Admin Panel */}
        <Flex position="absolute" left="85%" top="2vh">
          <HStack>
            <KitchenShowModel />
            {userMe.is_superuser && <AdminPanelButton />}
            <SignOutButton />
          </HStack>
        </Flex>

        <Flex position="absolute" top="25vh" left="10vw">
          <VStack alignItems="start">
            <HStack>
              <Text
                fontWeight="bold"
                fontSize={{
                  sm: 50,
                  lg: 70,
                }}
                color="white"
                textShadow="1px 1px #ff0000"
              >
                Welcome to
              </Text>
              <Text
                fontWeight="bold"
                fontSize={{
                  sm: 50,
                  lg: 70,
                }}
                color={COLOURS.MAIN_PAGE_YELLOW}
                textShadow="1px 1px #ff0000"
              >
                HIKKA LASSO
              </Text>
            </HStack>
            <Text
              textColor="white"
              noOfLines={2}
              width="40vw"
              fontFamily="serif"
              fontSize={20}
              textShadow="1px 1px #ff0000"
            >
              Delight in exquisite flavors at our charming restaurant, where
              every bite tells a unique story.
            </Text>
          </VStack>
        </Flex>

        <HStack position="absolute" top="75vh" left="50vw">
          <Button
            width={{
              lg: "300px",
              sm: "150px",
            }}
            height="50px"
            bg={COLOURS.MAIN_PAGE_BUTTON_COLOR_YELLOW}
            borderRadius={SIZES.MAIN_PAGE_BUTTON_BORDER_RADIOUS}
            variant="outline"
            textColor={COLOURS.MAIN_PAGE_YELLOW}
            borderColor={COLOURS.MAIN_PAGE_BLACK}
            _hover={{
              bg: COLOURS.MAIN_PAGE_YELLOW,
              textColor: COLOURS.MAIN_PAGE_BLACK,
            }}
          >
            <Link to="/dining">Dining</Link>
          </Button>
          <Button
            width={{
              lg: "300px",
              sm: "150px",
            }}
            bg={COLOURS.MAIN_PAGE_BUTTON_COLOR_YELLOW}
            borderColor={COLOURS.MAIN_PAGE_BLACK}
            height="50px"
            borderRadius={SIZES.MAIN_PAGE_BUTTON_BORDER_RADIOUS}
            variant="outline"            
            textColor={COLOURS.MAIN_PAGE_YELLOW}
            _hover={{
              bg: COLOURS.MAIN_PAGE_YELLOW,
              textColor: COLOURS.MAIN_PAGE_BLACK,
            }}
          >
            <Link to="/dining/order/T000">Take away</Link>
          </Button>
        </HStack>
      </Flex>
    </motion.div>
  );
};

export default MainPage;
