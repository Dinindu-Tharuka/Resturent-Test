import { FormLabel, Input, VStack, Text, Button, useToast } from "@chakra-ui/react";
import { COLOURS, REQUEST, SIZES } from "../../../../../Generics/constants";
import { useForm } from "react-hook-form";
import { User, UserProfile } from "../../../../../Generics/interfaces";
import useUserProfileMutate from "../../../../../Hooks/User/Profile/useUserProfileMutate";

interface Props {
  user: User;
  onSuccess:()=>void;
}

const UserProfileCreateForm = ({ user, onSuccess }: Props) => {
  const { handleSubmit, register } = useForm<UserProfile>();
  const toast = useToast()
  const userProfileMutate = useUserProfileMutate(() => {
    toast({
      title: 'Profile',
      description: "Profile created successfully.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    onSuccess()
  }, REQUEST.POST);

  const onSubmit = (data: UserProfile) => {
    const profile = {
      ...data,
      user_account_id: user.id,
    };

    console.log(profile)

    userProfileMutate.mutate(profile);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {userProfileMutate.isError && (
        <Text color="red">Profile Not created successfully.</Text>
      )}
      <VStack alignItems="start">
        <FormLabel>First Name</FormLabel>
        <Input
          {...register("first_name")}
          marginBottom={SIZES.FORM_FIELD_MARGIN}
        />
      </VStack>
      <VStack alignItems="start">
        <FormLabel>Last Name</FormLabel>
        <Input
          {...register("last_name")}
          marginBottom={SIZES.FORM_FIELD_MARGIN}
        />
      </VStack>

      <VStack alignItems="start" marginBottom={SIZES.FORM_FIELD_MARGIN}>
        <FormLabel>Telephone</FormLabel>
        <Input {...register("telephone")} type="text" />
      </VStack>
      <VStack alignItems="start" marginBottom={SIZES.FORM_FIELD_MARGIN}>
        <FormLabel>Address</FormLabel>
        <Input {...register("address")} type="text" />
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

export default UserProfileCreateForm;
