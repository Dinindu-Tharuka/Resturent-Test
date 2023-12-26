import { useMutation, useQueryClient } from "@tanstack/react-query";
import { REQUEST } from "../../../Generics/constants";
import categoriesService from "../../../services/store/categories-service";
import { Category } from "../../../Generics/interfaces";

const useCategoryMutate = (
  onSuccessfull: (category: Category) => void,
  requestType: string
) => {
  const queryClient = useQueryClient();

  const category = useMutation<Category, Error, Category>({
    mutationFn: (category: Category) => {
      if (requestType === REQUEST.POST) {
        return categoriesService.create(category).then((res) => res.data);
      } else if (requestType === REQUEST.DELETE) {
        return categoriesService.delete(category.id).then((res) => res.data);
      }

      return categoriesService
        .update(category, category.id)
        .then((res) => res.data);
    },
    onSuccess: (savedCategory, newCategory) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      onSuccessfull(savedCategory);
    },
  });

  return category;
};

export default useCategoryMutate;
