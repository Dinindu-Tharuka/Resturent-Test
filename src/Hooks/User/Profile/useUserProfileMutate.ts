import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserProfile } from "../../../Generics/interfaces";
import { REQUEST } from "../../../Generics/constants";
import userProfilesService from "../../../services/user/profile/user-profiles-service";

const useUserProfileMutate = (
  onSuccessfull: (profile: UserProfile) => void,
  requestType: string
) => {
  const queryClient = useQueryClient();

  const profile = useMutation<UserProfile, Error, UserProfile>({
    mutationFn: (profile: UserProfile) => {
      if (requestType === REQUEST.POST) {
        return userProfilesService.create(profile).then((res) => res.data);
      } else if (requestType === REQUEST.DELETE) {
        return userProfilesService.delete(profile.id).then((res) => res.data);
      }

      return userProfilesService
        .update(profile, profile.id)
        .then((res) => res.data);
    },
    onSuccess: (savedProfile, newProfile) => {
      queryClient.invalidateQueries({
        queryKey: ["profiles"],
      });

      onSuccessfull(savedProfile);
    },
  });

  return profile;
};

export default useUserProfileMutate;
