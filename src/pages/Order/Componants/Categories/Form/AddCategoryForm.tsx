import { useForm } from "react-hook-form";
import { Category } from "../../../../../Generics/interfaces";
import {
  Button,
  Checkbox,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { COLOURS, REQUEST, SIZES } from "../../../../../Generics/constants";
import useCategoryMutate from "../../../../../Hooks/Product/Category/useCategoryMutate";

const AddCategoryForm = () => {
  const { register, handleSubmit } = useForm<Category>();
  const toast = useToast();
  const categoryMutate = useCategoryMutate(() => {
    toast({
      title: "Category",
      description: "Category created successfully.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  }, REQUEST.POST);

  const onSubmit = (data: Category) => {
    categoryMutate.mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack alignItems="start">
        <FormLabel>Title</FormLabel>
        <Input {...register("title")} marginBottom={SIZES.FORM_FIELD_MARGIN} />
        <Checkbox
          defaultChecked
          {...register("is_food")}
          marginBottom={SIZES.FORM_FIELD_MARGIN}
        >
          Is Food
        </Checkbox>

        <Button
          type="submit"
          bg={COLOURS.ADMIN_PAGE_BUTTON_COLOR}
          color={COLOURS.BUTTON_LETTER_COLOR}
          marginBottom={5}
        >
          Create
        </Button>
      </VStack>
    </form>
  );
};

export default AddCategoryForm;
