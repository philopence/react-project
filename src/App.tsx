import Query from "@/Query";
import Router from "@/Router";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./contexts/theme";
import UserProvider from "./contexts/user";

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Query>
          <Router />
          <Toaster />
        </Query>
      </UserProvider>
    </ThemeProvider>
  );
}
