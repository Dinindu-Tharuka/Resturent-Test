import { Button, List, ListItem } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SidePanel = () => {
  const panelItems = ["Dashboard", "Reports", "Floors & Tables"];
  const routes = ['/admin', '/admin/reports', '/admin/floors'];
  const [selectedIndex, setSelectedIndex] = useState(0)
  const navigate = useNavigate()

  const onClick = (index:number)=>{
    
      navigate(routes[index])
   
  }

  
  return (
    <List height="100%" spacing={5}>
      {panelItems.map((item, index) => (
        <ListItem width="100%">
          <Button
            width="100%"
            height="10vh"
            borderRadius={50}
            bg={selectedIndex === index ? "#fc839f": ''}
            _hover={{
              background: "#fc839f",
            }}
            onClick={()=>{
              setSelectedIndex(index)
              onClick(index)}}
          >
            {item}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default SidePanel;
