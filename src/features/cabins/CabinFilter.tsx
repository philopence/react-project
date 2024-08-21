import Filter from "@/components/Filter";

const filters = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Only Discount",
    value: "only-discount",
  },
  {
    label: "No Discount",
    value: "no-discount",
  },
];

export default function CabinFilter() {
  return <Filter field="discount" filters={filters} />;
}
