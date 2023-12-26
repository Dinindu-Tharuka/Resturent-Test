import { Flex, IconButton, Text } from "@chakra-ui/react";
import { IoHomeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { COLOURS } from "../../../Generics/constants";

const NavBar = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/");
  };
  return (
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
        left="45vw"
      >
        Foods & Billing
      </Text>
    </Flex>
  );
};

export default NavBar;
