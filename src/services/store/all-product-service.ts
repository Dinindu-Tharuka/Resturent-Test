import { Product } from "../../Generics/interfaces";
import { HttpQueryService } from "../http-service";



export default new HttpQueryService<Product>("/store/all-products/");