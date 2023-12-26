
import { Table } from "../../Generics/interfaces";
import { HttpQueryService } from "../http-service";


export default new HttpQueryService<Table>(`/store/all-tables/`);