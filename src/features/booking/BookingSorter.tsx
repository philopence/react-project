import SortBy from "@/components/SortBy";

const sortBy = [
  {
    label: "Date (desc)",
    value: "date-desc",
  },
  {
    label: "Date (asce)",
    value: "date-asce",
  },
];

const field = "sortBy";

export default function BookingSorter() {
  return <SortBy field={field} options={sortBy} />;
}
