import allTableService from "../../services/Floor/all-table-service";
import { Table } from "../../Generics/interfaces";
import { useQuery } from "@tanstack/react-query";

const useAllTables = () => {
  const fetchData = ()=>{
    return allTableService.getAll()
  }
  return useQuery<Table[], Error>({
    queryKey: ["all-tables"],
    queryFn: () => fetchData(),
    refetchInterval:5000,
  });
};

export default useAllTables;
