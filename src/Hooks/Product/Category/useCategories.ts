import { useQuery } from "@tanstack/react-query";
import { Category } from "../../../Generics/interfaces";
import categoriesService from "../../../services/store/categories-service";


const useCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: () => categoriesService.getAll(),
  });
}

export default useCategories