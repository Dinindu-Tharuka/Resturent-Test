import { Table } from "../../Generics/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { REQUEST } from "../../Generics/constants";
import allTableService from "../../services/Floor/all-table-service";

const useAllTableMutate = (
  onSuccessfull: (table: Table) => void,
  requestType: string
) => {
  const queryClient = useQueryClient();

  const table = useMutation<Table, Error, Table>({
    mutationFn: (table: Table) => {
      if (requestType === REQUEST.POST) {
        return allTableService.create(table).then((res) => res.data);
      } else if (requestType === REQUEST.DELETE) {
        return allTableService
          .delete(table.id !== undefined ? table.id : 0)
          .then((res) => res.data);
      }

      return allTableService
        .update(table, table.id !== undefined ? table.id : 0)
        .then((res) => res.data);
    },
    onSuccess: (savedFloor, newFloor) => {
      queryClient.invalidateQueries({
        queryKey: ["all-tables"],
      });

      queryClient.invalidateQueries({
        queryKey:['tables']
      })

      onSuccessfull(savedFloor);
    },
  });

  return table;
};

export default useAllTableMutate;
