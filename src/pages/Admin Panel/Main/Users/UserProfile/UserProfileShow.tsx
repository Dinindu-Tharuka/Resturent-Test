import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ImProfile } from "react-icons/im";
import UserProfileCreateForm from "./UserProfileCreateForm";
import { User } from "../../../../../Generics/interfaces";
import useProfiles from "../../../../../Hooks/User/Profile/useProfiles";
import UserProfileUpdateForm from "./UserProfileUpdateForm";

interface Props {
  user: User;
}

const UserProfileShow = ({ user }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: profiles } = useProfiles();
  const selectedUserProfile = profiles?.find(
    (profile) => profile.user_account_id === user.id
  );

  console.log("profiles", profiles);

  return (
    <>
      <IconButton icon={<ImProfile />} aria-label="profile" onClick={onOpen} />
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedUserProfile ? (
              <UserProfileUpdateForm
                user={user}
                onSuccess={onClose}
                profile={selectedUserProfile}
              />
            ) : (
              <UserProfileCreateForm user={user} onSuccess={onClose} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserProfileShow;
