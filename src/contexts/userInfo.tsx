import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from "react";

type UserInfo = {
  _id: string;
  name: string;
  email: string;
};

type UserInfoProviderState = {
  userInfo: UserInfo | null;
  storageUserInfo: (userInfo: UserInfo) => void;
};

const UserInfoProviderContext = createContext<UserInfoProviderState | null>(
  null
);

export default function UserInfoProvider({
  storageKey = "userInfo",
  children
}: PropsWithChildren<{
  storageKey?: string;
}>) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
    const userInfo = localStorage.getItem(storageKey);

    if (userInfo === null) return null;

    return JSON.parse(userInfo);
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(userInfo));
  }, [userInfo, storageKey]);

  function storageUserInfo(userInfo: UserInfo) {
    setUserInfo(userInfo);
  }

  return (
    <UserInfoProviderContext.Provider value={{ userInfo, storageUserInfo }}>
      {children}
    </UserInfoProviderContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserInfoProviderContext);

  if (!context)
    throw new Error("useThemeContext must be used within a ThemeProvider");

  return context;
}
