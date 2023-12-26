import { useQuery } from "@tanstack/react-query";
import { PaginationStructure, User } from "../../../Generics/interfaces";
import usersService from "../../../services/user/users/users-service";

interface obj {
  page: number;
  username: string;
}

const useUsers = (query: obj) => {
  return useQuery<PaginationStructure<User>, Error>({
    queryKey: ["users", query],
    queryFn: () =>
      usersService.getAll({
        params: { page: query.page, username: query.username },
      }),
  });
};

export default useUsers;
