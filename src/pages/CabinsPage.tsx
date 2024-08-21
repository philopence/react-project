import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CabinFilter from "@/features/cabins/CabinFilter";
import CabinsTable from "@/features/cabins/CabinsTable";

export default function CabinsPage() {
  // TODO get all cabins
  return (
    <main>
      <header className="flex items-center justify-between">
        <div>
          <Button asChild>
            <Link to={{ pathname: `/cabins/new` }}>Create a Cabin</Link>
          </Button>
        </div>
        <div>
          <CabinFilter />
        </div>
      </header>

      <CabinsTable />
    </main>
  );
}
