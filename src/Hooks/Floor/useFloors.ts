import { useQuery } from "@tanstack/react-query";
import { Floor } from "../../Generics/interfaces";
import floorService from "../../services/Floor/floor-service";


const useFloors = () => {
  return useQuery<Floor[], Error>({
    queryKey: ["floors"],
    queryFn: () => floorService.getAll(),
  });
}

export default useFloors