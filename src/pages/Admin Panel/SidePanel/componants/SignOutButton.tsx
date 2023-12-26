import {  IconButton } from "@chakra-ui/react";
import {  useNavigate } from 'react-router-dom'
import { LiaSignOutAltSolid } from "react-icons/lia";

const SignOutButton = () => {
  const navigate = useNavigate()
  const onClick = ()=>{
    localStorage.clear()
    navigate('/login')
  }
  return (
    <IconButton
    icon={<LiaSignOutAltSolid/>}
    aria-label="signout"
    onClick={onClick}
    />
  );
};

export default SignOutButton;
