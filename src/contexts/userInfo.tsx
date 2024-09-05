import { createContext, PropsWithChildren, useContext, useState } from "react";

type UserInfo = {
  _id: string;
  name: string;
  email: string;
  avatar: string | null;
};

type UserInfoProviderState = {
  userInfo: UserInfo | null;
  storageUserInfo: (userInfo: UserInfo) => void;
};

const UserInfoProviderContext = createContext<UserInfoProviderState | null>(
  null
);

export default function UserInfoProvider({ children }: PropsWithChildren) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  function storageUserInfo(userInfo: UserInfo) {
    setUserInfo(userInfo);
  }

  return (
    <UserInfoProviderContext.Provider value={{ userInfo, storageUserInfo }}>
      {children}
    </UserInfoProviderContext.Provider>
  );
}

export function useUserInfoContext() {
  const context = useContext(UserInfoProviderContext);

  if (!context)
    throw new Error(
      "useUserInfoContext must be used within a UserInfoProvider"
    );

  return context;
}
