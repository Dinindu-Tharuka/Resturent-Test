import { Table } from "../../Generics/interfaces";
import { HttpQueryService } from "../http-service";


const tableService = (floor_id:number)=>{
    return new HttpQueryService<Table>(`/store/floors/${floor_id}/tables/`);
}

export default tableService