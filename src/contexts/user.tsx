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

type UserProviderState = {
  userInfo: UserInfo | null;
  storageUserInfo: (userInfo: UserInfo) => void;
};

const UserProviderContext = createContext<UserProviderState | null>(null);

export default function UserProvider({
  storageKey = "userInfo",
  children
}: PropsWithChildren<{
  storageKey?: string;
}>) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
    const user = localStorage.getItem(storageKey);

    if (user === null) return null;

    return JSON.parse(user);
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(userInfo));
  }, [userInfo, storageKey]);

  function storageUserInfo(userInfo: UserInfo) {
    setUserInfo(userInfo);
  }

  return (
    <UserProviderContext.Provider value={{ userInfo, storageUserInfo }}>
      {children}
    </UserProviderContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserProviderContext);

  if (!context)
    throw new Error("useThemeContext must be used within a ThemeProvider");

  return context;
}
