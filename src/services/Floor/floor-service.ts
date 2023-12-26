import { Floor } from "../../Generics/interfaces";
import { HttpQueryService } from "../http-service";



export default new HttpQueryService<Floor>("/store/floors/");