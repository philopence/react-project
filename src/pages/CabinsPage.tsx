import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CabinSorter from "@/features/cabin/CabinSorter";
import CabinsTable from "@/features/cabin/CabinsTable";

export default function CabinsPage() {
  return (
    <div>
      <header className="flex items-center justify-between">
        <div>
          <Button asChild>
            <Link to={{ pathname: `/cabins/new` }}>Create a Cabin</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div>
            <CabinSorter />
          </div>
        </div>
      </header>

      <main>
        <CabinsTable />
      </main>
    </div>
  );
}
