import { Category } from "../../Generics/interfaces";
import { HttpQueryService } from "../http-service";


export default new HttpQueryService<Category>("/store/product-categories/");