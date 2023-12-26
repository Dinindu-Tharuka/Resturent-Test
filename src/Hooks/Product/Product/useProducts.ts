import { useQuery } from "@tanstack/react-query";
import { Product } from "../../../Generics/interfaces";
import productsService from "../../../services/store/products-service";

interface Query{
  category_id:number
}

export const useProduct = (query:Query) => {
  return useQuery<Product[], Error>({
    queryKey: ["products", query],
    queryFn: () => productsService(query.category_id).getAll(),
  });
}