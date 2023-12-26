import { Table } from "../../Generics/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { REQUEST } from "../../Generics/constants";
import tableService from "../../services/Floor/table-service";

const useMutateTable = (
  onSuccessfull: (table: Table) => void,
  requestType: string
) => {
  const queryClient = useQueryClient();

  const table = useMutation<Table, Error, Table>({
    mutationFn: (table: Table) => {
      if (requestType === REQUEST.POST) {
        return tableService(table.floor_id).create(table).then((res) => res.data);
      } else if (requestType === REQUEST.DELETE) {
        return tableService(table.floor_id)
          .delete(table.id !== undefined ? table.id : 0)
          .then((res) => res.data);
      }

      return tableService(table.floor_id)
        .update(table, table.id !== undefined ? table.id : 0)
        .then((res) => res.data);
    },
    onSuccess: (savedFloor, newFloor) => {
      queryClient.invalidateQueries({
        queryKey: ["tables"],
      });

      onSuccessfull(savedFloor);
    },
  });

  return table;
};

export default useMutateTable;
