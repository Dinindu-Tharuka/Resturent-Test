import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../services/api-client";

const PasswordReset = () => {
  const params = useParams();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmitForm = (data: FieldValues) => {
    const obj = { ...params, ...data };
    console.log(obj);

    axios
      .post(`${BASE_URL}/api/users/reset_password_confirm/`, { ...obj })
      .then(() => setSuccess(true))
      .catch((err) => setError(err.message));
  };
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <Box alignContent="center" width="30vw">
        <Text marginBottom={10} align="center" fontSize={30} fontWeight="bold">
          Reset Password
        </Text>
        <form onSubmit={handleSubmit(onSubmitForm)} className="w-100">
          <div className="mb-3 h-75 ">
            <Input
              {...register("new_password")}
              borderColor="#ea6262"
              type="password"
              placeholder="New Password"
              borderRadius={15}
              bg="whiteAlpha.800"
              height="7vh"
            />
          </div>
          <div className="mb-3 h-75 ">
            <Input
              {...register("re_new_password")}
              type="password"
              placeholder="Confirm New Password"
              borderColor="#ea6262"
              borderRadius={15}
              bg="whiteAlpha.800"
              height="7vh"
            />
          </div>

          <div>
            <Button
              textColor={"#200005"}
              type="submit"
              bg="#dd0939"
              padding={15}
              height="8vh"
              width="100%"
              borderRadius={15}
              fontWeight="bold"
              _hover={{ bg: "#f95278" }}
            >
              Confirm
            </Button>
          </div>
        </form>
        {error && (
          <Text align="center" marginTop={5} textColor="red.700">
            {error}
          </Text>
        )}
        {success && (
          <Flex flexDir="column" alignItems="center">
            <Text align="center" textColor="green.700">
              Succesfully changed the password.
            </Text>

            <Link to="/login">
              <Text textColor="green.600" fontWeight="bold">
                Login Here
              </Text>
            </Link>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default PasswordReset;
