import {
  Button,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { COLOURS, SIZES } from "../../../../../Generics/constants";
import { User } from "../../../../../Generics/interfaces";
import axiosInstance from "../../../../../services/api-client";
import { useQueryClient } from "@tanstack/react-query";

interface Props{
    onSuccess:()=>void
}

const UserAddForm = ({ onSuccess }:Props) => {
  const toast = useToast();
  const [value, setValue] = useState("2");
  const [error, setError] = useState("");
  const { handleSubmit, register } = useForm();
  const queryClient = useQueryClient();

  const onSubmit = (data: FieldValues) => {
    const user = {
      ...data,
      is_superuser: value === "1" ? true : false,
      is_chef: value === "2" ? true : false,
      is_cashier: value === "3" ? true : false,
    } as User;

    axiosInstance
      .post("/users/", user)
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });

        setError('')
        onSuccess()

        toast({
          title: "User Creation",
          description: "User created successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(() => setError("User not created."));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <Text color="red">{error}</Text>}
      <VStack alignItems="start">
        <FormLabel>Username</FormLabel>
        <Input
          {...register("user_name")}
          marginBottom={SIZES.FORM_FIELD_MARGIN}
        />
      </VStack>
      <VStack alignItems="start">
        <FormLabel>Email</FormLabel>
        <Input {...register("email")} marginBottom={SIZES.FORM_FIELD_MARGIN} />
      </VStack>
      <VStack alignItems="start">
        <FormLabel>Designation</FormLabel>

        <RadioGroup
          onChange={setValue}
          defaultValue={value}
          marginBottom={SIZES.FORM_FIELD_MARGIN}
        >
          <Stack direction="row">
            <Radio value="1">Admin</Radio>
            <Radio value="2">Chef</Radio>
            <Radio value="3">Chashier</Radio>
          </Stack>
        </RadioGroup>
      </VStack>
      <VStack alignItems="start" marginBottom={SIZES.FORM_FIELD_MARGIN}>
        <FormLabel>Password</FormLabel>
        <Input {...register("password")} type="password"/>
      </VStack>
      <VStack alignItems="start" marginBottom={SIZES.FORM_FIELD_MARGIN}>
        <FormLabel>Confirm Password</FormLabel>
        <Input {...register("re_password")} type="password"/>
      </VStack>

      <Button
        type="submit"
        bg={COLOURS.ADMIN_PAGE_BUTTON_COLOR}
        color={COLOURS.BUTTON_LETTER_COLOR}
      >
        Create
      </Button>
    </form>
  );
};

export default UserAddForm;
