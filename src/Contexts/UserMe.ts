import React from "react";

interface UserMeContextType {
  id: number;
  user_name: string;
  email: string;
  is_active?: boolean;
  is_superuser: boolean;
  is_chef: boolean;
  is_cashier: boolean;
}

const UserMeContext = React.createContext<UserMeContextType>(
  {} as UserMeContextType
);

export default UserMeContext;
