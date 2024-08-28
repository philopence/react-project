import SortBy from "@/components/SortBy";

const sortBy = [
  {
    label: "Date (desc)",
    value: "date-desc",
  },
  {
    label: "Date (asce)",
    value: "Date-asce",
  },
  // {
  //   label: "Discount (desc)",
  //   value: "discount-desc",
  // },
  // {
  //   label: "Discont (asce)",
  //   value: "discount-asce",
  // },
  // {
  //   label: "Max Capacity (desc)",
  //   value: "maxCapacity-desc",
  // },
  // {
  //   label: "Max Capacity (asce)",
  //   value: "maxCapacity-asce",
  // },
];

const field = "sortBy";

export default function BookingSorter() {
  return <SortBy field={field} options={sortBy} />;
}
