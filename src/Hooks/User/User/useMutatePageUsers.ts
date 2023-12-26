import { useMutation, useQueryClient } from "@tanstack/react-query";
import usersService from "../../../services/user/users/users-service";
import { User } from "../../../Generics/interfaces";
import { REQUEST } from "../../../Generics/constants";

const useMutateUsers = (
  onSuccessfull: (savedUser: User) => void,
  requestType: string
) => {
  const queryClient = useQueryClient();

  const createUser = useMutation<User, Error, User>({
    mutationFn: (user: User) => {
      if (requestType === REQUEST.POST) {
        return usersService
          .create(user)
          .then((res) => res.data);
      }else if (requestType === REQUEST.DELETE){
        return usersService
            .delete(user.id)
            .then((res)=> res.data)
      }

      return usersService
        .update(user, user.id)
        .then((res) => res.data);
    },
    onSuccess: (savedUser, newUser) => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      onSuccessfull(savedUser);
    },
  });

  return createUser;
};

export default useMutateUsers;
