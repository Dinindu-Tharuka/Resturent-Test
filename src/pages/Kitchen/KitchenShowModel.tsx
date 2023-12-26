import { IconButton} from "@chakra-ui/react";
import { TbToolsKitchen } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
const KitchenShowModel = () => {
  const navigate = useNavigate()

  const onClick = ()=>{
    return navigate('/kitchen')
  }
  return (
    <>
      <IconButton icon={<TbToolsKitchen/>} onClick={onClick} aria-label="open kitchen"/>      
    </>
  );
};

export default KitchenShowModel;
