import { useQuery } from "@tanstack/react-query";
import { Table } from "../../Generics/interfaces";
import tableService from "../../services/Floor/table-service";

interface Query{
    floor_id:number
}

const useTables = (query:Query) => {
  return useQuery<Table[], Error>({
    queryKey: ["tables", query],
    queryFn: () => tableService(query.floor_id).getAll(),
    refetchInterval:5000
  });
}

export default useTables