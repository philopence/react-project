import { Copy, EllipsisVertical, FileSliders, Trash2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
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
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { CabinApi } from "@/schemas/cabin";
import useCreateCabinMutation from "./useCreateCabinMutation";
import { useDeleteCabinMutation } from "./useDeleteCabinMutation";
import { useGetCabinsQuery } from "./useGetCabinsQuery";

export default function CabinsTable() {
  const { data: cabins, isLoading } = useGetCabinsQuery();

  const [searchParams] = useSearchParams();

  if (isLoading || !cabins) return null;

  const discount = searchParams.get("discount");

  let filteredCabins = cabins;

  if (discount === "only-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  if (discount === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  const sortBy = searchParams.get("sortBy");

  if (sortBy?.startsWith("price")) {
    const order = sortBy.split("-").pop();

    filteredCabins.sort((prev, next) => {
      return order === "desc"
        ? next.price - prev.price
        : prev.price - next.price;
    });
  }

  if (sortBy?.startsWith("discount")) {
    const order = sortBy.split("-").pop();

    filteredCabins.sort((prev, next) => {
      return order === "desc"
        ? next.discount - prev.discount
        : prev.discount - next.discount;
    });
  }

  if (sortBy?.startsWith("maxCapacity")) {
    const order = sortBy.split("-").pop();

    filteredCabins.sort((prev, next) =>
      order === "desc"
        ? next.maxCapacity - prev.maxCapacity
        : prev.maxCapacity - next.maxCapacity
    );
  }

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
        {filteredCabins.map((cabin) => (
          <CabinsTableRow key={cabin._id} cabin={cabin} />
        ))}
      </TableBody>
    </Table>
  );
}

function CabinsTableRow({ cabin }: { cabin: CabinApi }) {
  const { image, name, maxCapacity, price, discount } = cabin;

  return (
    <TableRow>
      <TableCell>
        <img className="w-32 aspect-video" src={image} alt={name} />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{maxCapacity}</TableCell>
      <TableCell>{formatCurrency(price)}</TableCell>
      <TableCell>{`-${discount}%`}</TableCell>
      <TableCell>
        <CabinActions cabin={cabin} />
      </TableCell>
    </TableRow>
  );
}

function CabinActions({ cabin }: { cabin: CabinApi }) {
  const { _id, image, name, maxCapacity, price, discount, description } = cabin;

  const { mutate: createCabinMutate, isPending: isCreateCabinPending } =
    useCreateCabinMutation();

  const { mutate: deleteCabinMutate, isPending } = useDeleteCabinMutation();

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
              disabled={isCreateCabinPending}
              onClick={() => {
                createCabinMutate({
                  name: `copy of ${name}`,
                  image,
                  maxCapacity,
                  price,
                  discount,
                  description
                });
              }}
            >
              <div className="flex items-center gap-1">
                <Copy size={16} />
                <span>Duplicate</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                className="flex items-center gap-1"
                to={{ pathname: `/cabins/edit/${_id}` }}
                state={cabin}
              >
                <FileSliders size={16} />
                <span>Edit</span>
              </Link>
              {/* </div> */}
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <AlertDialogTrigger className="w-full">
                <div className="flex items-center gap-1">
                  <Trash2 size={16} />
                  <span>Delete</span>
                </div>
              </AlertDialogTrigger>
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
              disabled={isPending}
              onClick={() => deleteCabinMutate(_id)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
