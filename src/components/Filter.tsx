import { useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";

type Props = {
  field: string;
  filters: Array<{
    label: string;
    value: string;
  }>;
};
export default function Filter({ field, filters }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleFilter(search: string) {
    searchParams.set(field, search);
    setSearchParams(searchParams);
  }
  return (
    <ul className="flex items-center">
      {filters.map((f) => (
        <li key={f.value}>
          <Button
            variant={
              searchParams.get(field) === f.value ? "default" : "outline"
            }
            onClick={() => handleFilter(f.value)}
          >
            {f.label}
          </Button>
        </li>
      ))}
    </ul>
  );
}
