import SortBy from "@/components/SortBy";

const sortBy = [
  {
    label: "Price (desc)",
    value: "price-desc"
  },
  {
    label: "Price (asce)",
    value: "price-asce"
  },
  {
    label: "Discount (desc)",
    value: "discount-desc"
  },
  {
    label: "Discont (asce)",
    value: "discount-asce"
  },
  {
    label: "Max Capacity (desc)",
    value: "maxCapacity-desc"
  },
  {
    label: "Max Capacity (asce)",
    value: "maxCapacity-asce"
  }
];

const field = "sortBy";

export default function CabinSorter() {
  return <SortBy field={field} options={sortBy} />;
}
