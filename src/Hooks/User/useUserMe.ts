import { useEffect, useState } from "react";
import axiosInstance from "../../services/api-client";
import { User } from "../../Generics/interfaces";

const useUserMe = () => {
  const [userMe, setUserMe] = useState<User>({} as User);

  useEffect(() => {
    axiosInstance
      .get("/users/me/")
      .then((res) => setUserMe(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  return { userMe };
};

export default useUserMe;
