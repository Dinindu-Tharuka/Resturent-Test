import {
  FormLabel,
  Input,
  VStack,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { COLOURS, REQUEST, SIZES } from "../../../../../Generics/constants";
import { useForm } from "react-hook-form";
import { User, UserProfile } from "../../../../../Generics/interfaces";
import useUserProfileMutate from "../../../../../Hooks/User/Profile/useUserProfileMutate";

interface Props {
  user: User;
  onSuccess: () => void;
  profile: UserProfile;
}

const UserProfileUpdateForm = ({ user, onSuccess, profile }: Props) => {
  const { handleSubmit, register } = useForm<UserProfile>();
  const toast = useToast();
  const userProfileMutate = useUserProfileMutate(() => {
    toast({
      title: "Profile",
      description: "Profile updated successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onSuccess();
  }, REQUEST.UPDATE);

  const onSubmit = (data: UserProfile) => {
    const profile_new = {
      ...data,
      user_account_id: user.id,
      id:profile.id
    };

    console.log(profile);

    userProfileMutate.mutate(profile_new);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {userProfileMutate.isError && (
        <Text color="red">Profile Not Updated successfully.</Text>
      )}
      <VStack alignItems="start">
        <FormLabel>First Name</FormLabel>
        <Input
          {...register("first_name")}
          defaultValue={profile.first_name}
          marginBottom={SIZES.FORM_FIELD_MARGIN}
        />
      </VStack>
      <VStack alignItems="start">
        <FormLabel>Last Name</FormLabel>
        <Input
          {...register("last_name")}
          defaultValue={profile.last_name}
          marginBottom={SIZES.FORM_FIELD_MARGIN}
        />
      </VStack>

      <VStack alignItems="start" marginBottom={SIZES.FORM_FIELD_MARGIN}>
        <FormLabel>Telephone</FormLabel>
        <Input
          {...register("telephone")}
          type="text"
          defaultValue={profile.telephone}
        />
      </VStack>
      <VStack alignItems="start" marginBottom={SIZES.FORM_FIELD_MARGIN}>
        <FormLabel>Address</FormLabel>
        <Input
          {...register("address")}
          type="text"
          defaultValue={profile.address}
        />
      </VStack>

      <Button
        type="submit"
        bg={COLOURS.ADMIN_PAGE_BUTTON_COLOR}
        color={COLOURS.BUTTON_LETTER_COLOR}
      >
        Update
      </Button>
    </form>
  );
};

export default UserProfileUpdateForm;
