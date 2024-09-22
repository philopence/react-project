import CabinForm from "./CabinForm";
import useGetCabinByIdQuery from "./useGetCabinByIdQuery";

export default function UpdateCabin({ id }: { id: string }) {
  const getCabinByIdQuery = useGetCabinByIdQuery(id);

  if (getCabinByIdQuery.isPending) return "Loading...";

  if (getCabinByIdQuery.isError) return `Error: ${getCabinByIdQuery.error}`;

  return <CabinForm cabinValues={getCabinByIdQuery.data} />;
}
