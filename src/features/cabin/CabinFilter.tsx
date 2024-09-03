import { Button } from "@/components/ui/button";

/**
 * TODO design
 * ?discount[eq]=0
 */

export default function CabinFilter() {
  return (
    <ul className="flex items-center gap-2">
      <li>
        <Button variant={"outline"}>All</Button>
      </li>
      <li>
        <Button variant={"outline"}></Button>
      </li>
      <li>
        <Button variant={"outline"}>All</Button>
      </li>
    </ul>
  );
}
