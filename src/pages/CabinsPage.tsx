import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import CabinSorter from "@/features/cabin/CabinSorter";
import CabinsTable from "@/features/cabin/CabinsTable";

export default function CabinsPage() {
  return (
    <div>
      <header className="flex items-center justify-between">
        <div>
          <Link className={buttonVariants()} to={{ pathname: `/cabins/new` }}>
            Create a Cabin
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <CabinSorter />
        </div>
      </header>

      <main>
        <CabinsTable />
      </main>
    </div>
  );
}
