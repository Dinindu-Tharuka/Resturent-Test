import { IconButton } from "@chakra-ui/react";

import { RiAdminFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const AdminPanelButton = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/admin");
  };
  return (
    <>
      <IconButton icon={<RiAdminFill />} aria-label="admin" onClick={onClick} />
    </>
  );
};

export default AdminPanelButton;
