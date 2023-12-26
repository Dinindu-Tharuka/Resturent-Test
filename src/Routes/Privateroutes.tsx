import { Outlet, Navigate } from 'react-router-dom'
import {jwtDecode} from "jwt-decode";
import dayjs from "dayjs";

interface UserToken{    
  token_type: string;
  exp: number,
  iat: number,
  jti: string,
  user_id: number

}

const Privateroutes = () => {
  const access_token = localStorage.getItem("access");
  let isExpired = null;
  if (access_token) {
    const user: UserToken = jwtDecode(access_token ? access_token : "");
    isExpired = dayjs.unix(user?.exp).diff(dayjs()) < 1;
    if (isExpired) return <Navigate to="/login" />;
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default Privateroutes