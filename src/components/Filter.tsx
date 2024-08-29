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

  const fieldValue = searchParams.get(field) || "";

  function handleFilter(filter: string) {
    if (filter === "") {
      searchParams.delete(field);
    } else {
      searchParams.set(field, filter);
    }
    setSearchParams(searchParams);
  }
  return (
    <ul className="flex items-center">
      {filters.map((f) => (
        <li key={f.value}>
          <Button
            variant={fieldValue === f.value ? "default" : "outline"}
            onClick={() => handleFilter(f.value)}
          >
            {f.label}
          </Button>
        </li>
      ))}
    </ul>
  );
}
