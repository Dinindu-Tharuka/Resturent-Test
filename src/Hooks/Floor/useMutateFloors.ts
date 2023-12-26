import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Floor } from "../../Generics/interfaces";
import floorService from "../../services/Floor/floor-service";
import { REQUEST } from "../../Generics/constants";

const useMutateFloors = (
  onSuccessfull: (floor: Floor) => void,
  onError:()=>void,
  requestType: string
) => {
  const queryClient = useQueryClient();

  const floor = useMutation<Floor, Error, Floor>({
    mutationFn: (floor: Floor) => {
      if (requestType === REQUEST.POST) {
        return floorService.create(floor).then((res) => res.data);
      } else if (requestType === REQUEST.DELETE) {
        return floorService
          .delete(floor.id !== undefined ? floor.id : 0)
          .then((res) => res.data);
      }

      return floorService
        .update(floor, floor.id !== undefined ? floor.id : 0)
        .then((res) => res.data);
    },
    onSuccess: (savedFloor, newFloor) => {
      queryClient.invalidateQueries({
        queryKey: ["floors"],
      });

      onSuccessfull(savedFloor);
    },

    onError:()=>{
      onError()
    }
  });

  return floor;
};

export default useMutateFloors;
