import Query from "@/Query";
import Router from "@/Router";
import { Toaster } from "@/components/ui/toaster";

export default function App() {
  return (
    <Query>
      <Router />
      <Toaster />
    </Query>
  );
}
