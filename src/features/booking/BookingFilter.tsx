import Filter from "@/components/Filter";

const filters = [
  {
    label: "All",
    value: ""
  },
  {
    label: "Unconfirmed",
    value: "unconfirmed"
  },
  {
    label: "Check in",
    value: "check-in"
  },
  {
    label: "Check out",
    value: "check-out"
  }
];

export default function BookingFilter() {
  return <Filter field="status[eq]" filters={filters} />;
}
