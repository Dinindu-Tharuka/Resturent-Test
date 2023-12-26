import { Order, PaginationStructure } from "../../Generics/interfaces";
import { HttpQueryService } from "../http-service";


export default new HttpQueryService<PaginationStructure<Order>>("/store/page-orders/");