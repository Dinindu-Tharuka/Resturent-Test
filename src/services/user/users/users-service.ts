import { User } from "../../../Generics/interfaces";
import { HttpQueryService } from "../../http-service";


export default new HttpQueryService<User>("/page-users/");