import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  field: string;
  options: Array<{
    label: string;
    value: string;
  }>;
};

export default function SortBy({ field, options: sortBy }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSortBy(value: string) {
    searchParams.set(field, value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      onValueChange={handleSortBy}
      defaultValue={searchParams.get(field) || undefined}
    >
      <SelectTrigger>
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        {sortBy.map((s) => (
          <SelectItem key={s.value} value={s.value}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
