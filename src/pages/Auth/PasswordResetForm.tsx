import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { BASE_URL } from "../../services/api-client";
import { useState } from "react";

const PasswordResetForm = () => {
  const { register, handleSubmit } = useForm();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('')


  const resetPassword = (data: FieldValues) => {
    console.log(data);

    axios
      .post(`${BASE_URL}/api/users/reset_password/`, data)
      .then((res) =>{ 
        console.log('data', res.data)
        setSuccess('Successfully sent Email')})
      .catch(()=> setError('There is a error sending email.'))
      
  };
  return (
    <>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Reset Password
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {error && <Text color='red'>{error}</Text>}
            {success && <Text color='green'>{success}</Text>}
            <form onSubmit={handleSubmit(resetPassword)}>
              <Input
                {...register("email")}
                borderColor="#ea6262"
                type="text"
                placeholder="Enter the Email"
                borderRadius={15}
                bg="whiteAlpha.800"
                height="7vh"
              />
             
              <Button
                textColor="whiteAlpha.700"
                marginTop={3}
                type="submit"
                bg="#dd0939"
                padding={15}
                height="5vh"
                borderRadius={15}
                _hover={{ bg: "whiteAlpha.400" }}
              >
                Send Confirmation
              </Button>

            
            </form>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default PasswordResetForm;
