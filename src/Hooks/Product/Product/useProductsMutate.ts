import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "../../../Generics/interfaces";
import { REQUEST } from "../../../Generics/constants";
import productsService from "../../../services/store/products-service";

const useProductsMutate = (
  onSuccessfull: (product: Product) => void,
  requestType: string,
  category_id:number
) => {
  const queryClient = useQueryClient();

  const product = useMutation<Product, Error, Product>({
    mutationFn: (product: Product) => {
      if (requestType === REQUEST.POST) {
        return productsService(category_id).create(product).then((res) => res.data);
      } else if (requestType === REQUEST.DELETE) {
        return productsService(category_id).delete(product.id).then((res) => res.data);
      }

      return productsService(category_id)
        .update(product, product.id)
        .then((res) => res.data);
    },
    onSuccess: (savedProduct, newProduct) => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      queryClient.invalidateQueries({
        queryKey:["all-products"]
      })

      onSuccessfull(savedProduct);
    },
  });

  return product;
};

export default useProductsMutate;
