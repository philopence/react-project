import { Copy, FileSliders, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { CabinApi } from "@/schemas/cabin";
import useCreateCabinMutation from "./useCreateCabinMutation";
import { useDeleteCabinMutation } from "./useDeleteCabinMutation";
import { useGetCabinsQuery } from "./useGetCabinsQuery";

export default function CabinsTable() {
  const { data: cabins, isLoading } = useGetCabinsQuery();

  if (isLoading) return null;

  return (
    <Table>
      <TableCaption>A list of all cabins.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cabins?.map((cabin) => (
          <CabinsTableRow key={cabin._id} cabin={cabin} />
        ))}
      </TableBody>
    </Table>
  );
}

function CabinsTableRow({ cabin }: { cabin: CabinApi }) {
  const { _id, image, name, maxCapacity, price, discount, description } = cabin;

  const { mutate: deleteCabinMutate, isPending } = useDeleteCabinMutation();

  const { mutate: createCabinMutate, isPending: isCreateCabinPending } =
    useCreateCabinMutation();

  return (
    <TableRow>
      <TableCell>
        <img className="w-32 aspect-video" src={`/${image}`} alt={name} />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{maxCapacity}</TableCell>
      <TableCell>{formatCurrency(price)}</TableCell>
      <TableCell>{`-${discount}%`}</TableCell>
      <TableCell>
        <Button
          size="icon"
          disabled={isCreateCabinPending}
          onClick={() => {
            createCabinMutate({
              name: `copy of ${name}`,
              image,
              maxCapacity,
              price,
              discount,
              description,
            });
          }}
        >
          <Copy size={16} />
        </Button>
        <Button size="icon" asChild>
          <Link to={{ pathname: `/cabins/edit/${_id}` }} state={cabin}>
            <FileSliders size={16} />
          </Link>
        </Button>
        <Button
          size="icon"
          disabled={isPending}
          onClick={() => deleteCabinMutate(_id)}
        >
          <Trash2 size={16} />
        </Button>
      </TableCell>
    </TableRow>
  );
}
