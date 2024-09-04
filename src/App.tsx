import Query from "@/Query";
import Router from "@/Router";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./contexts/theme";
import UserInfoProvider from "./contexts/userInfo";

export default function App() {
  return (
    <ThemeProvider>
      <UserInfoProvider>
        <Query>
          <Router />
          <Toaster />
        </Query>
      </UserInfoProvider>
    </ThemeProvider>
  );
}
