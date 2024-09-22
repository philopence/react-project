import { PropsWithChildren } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

type Props = PropsWithChildren<{
  field: string;
  options: Array<{
    label: string;
    value: string;
  }>;
}>;

/**
 * SortBy component is a dropdown menu that allows users to select a sorting option.
 * The selected value is updated in the URL's query parameters using React Router's useSearchParams hook.
 */
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
