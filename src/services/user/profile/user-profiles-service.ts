import { UserProfile } from "../../../Generics/interfaces";
import { HttpQueryService } from "../../http-service";

export default new HttpQueryService<UserProfile>("/profiles/");