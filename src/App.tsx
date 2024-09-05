import Query from "@/Query";
import Router from "@/Router";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./contexts/theme";

export default function App() {
  return (
    <ThemeProvider>
      <Query>
        <Router />
        <Toaster />
      </Query>
    </ThemeProvider>
  );
}
