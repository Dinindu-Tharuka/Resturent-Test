import { Button, Input, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useMutateFloors from "../../../../Hooks/Floor/useMutateFloors";
import { REQUEST } from "../../../../Generics/constants";
import { Floor } from "../../../../Generics/interfaces";

interface Props{
  onClose:()=>void
}

const FloorAddForm = ({ onClose }:Props) => {
  const { register, handleSubmit } = useForm<Floor>();
  const toast = useToast()
  const floorMutate = useMutateFloors(() => {
    toast({
        title: 'Floor',
        description: "Floor Created successfully.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      onClose()

      
  },()=>{
    toast({
      title: 'Floor',
      description: "Floor Created not successfully.",
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }, REQUEST.POST);

  const onSubmit = (data:Floor) => {

    floorMutate.mutate(data)
  };

  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="Floor No"
        {...register("floor_number")}
        type="number"
        marginBottom={5}
      />
      <Input
        placeholder="Start Table No"
        {...register("table_start_number")}
        type="text"
        marginBottom={5}
      />
      <Input
        placeholder="End Table No"
        {...register("table_end_number")}
        type="text"
        marginBottom={5}
      />
      <Input
        placeholder="VIP Start Table No"
        {...register("vip_table_start_number")}
        type="text"
        marginBottom={5}
      />
      <Input
        placeholder="VIP End Table No"
        {...register("vip_table_end_number")}
        type="text"
        marginBottom={5}
      />
      <Button type="submit">Add</Button>
    </form>
  );
};

export default FloorAddForm;
