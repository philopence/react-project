import { EllipsisVertical } from "lucide-react";
import { PropsWithChildren } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "@/components/Pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { CabinResponse } from "@/schemas/response";
import useCreateCabinMutation from "./useCreateCabinMutation";
import { useDeleteCabinByIdMutation } from "./useDeleteCabinByIdMutation";
import { useGetCabinsQuery } from "./useGetCabinsQuery";

/**
 * @description handle cabins data (filter, sort)
 */
export default function CabinsTable() {
  const [searchParams] = useSearchParams();

  const getCabinsQuery = useGetCabinsQuery(searchParams.toString());

  if (getCabinsQuery.isPending) return "Loading...";

  if (getCabinsQuery.isError) return `Error: ${getCabinsQuery.error.message}`;

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
        {getCabinsQuery.data.cabins.map((cabin) => (
          <CabinsTableRow key={cabin._id} cabin={cabin} />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>
            <Pagination pagination={getCabinsQuery.data.pagination} />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function CabinsTableRow({
  cabin
}: PropsWithChildren<{
  cabin: CabinResponse;
}>) {
  const { image, name, maxCapacity, price, discount } = cabin;

  return (
    <TableRow>
      <TableCell>
        {image && <img className="w-32 aspect-video" src={image} alt={name} />}
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{maxCapacity}</TableCell>
      <TableCell>{formatCurrency(price)}</TableCell>
      <TableCell>{discount ? `-${discount}%` : "-"}</TableCell>
      <TableCell>
        <CabinActions cabin={cabin} />
      </TableCell>
    </TableRow>
  );
}

function CabinActions({
  cabin
}: PropsWithChildren<{
  cabin: CabinResponse;
}>) {
  const { _id, image, name, maxCapacity, price, discount, description } = cabin;

  const createCabinmutation = useCreateCabinMutation();

  const deleteCabinByIdMutation = useDeleteCabinByIdMutation();

  // NOTE: Unable to duplicate continuously to the same target
  function handleDuplicateCabin() {
    createCabinmutation.mutate({
      name: `copy of ${name}`,
      image: image || undefined,
      maxCapacity,
      price,
      discount,
      description
    });
  }

  return (
    <>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Cabin Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={createCabinmutation.isPending}
              onClick={handleDuplicateCabin}
            >
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={{ pathname: `/cabins/edit/${_id}` }}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <AlertDialogTrigger className="w-full">Delete</AlertDialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deleteCabinByIdMutation.isPending}
              onClick={() => deleteCabinByIdMutation.mutate(_id)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
