import { Product } from "../../Generics/interfaces";
import { HttpQueryService } from "../http-service";

const productsService = (category_id:number) => {
  return new HttpQueryService<Product>(`/store/product-categories/${category_id}/products/`);
};

export default productsService
