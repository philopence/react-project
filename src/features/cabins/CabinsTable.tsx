import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency } from "@/lib/utils";
import { deleteCabinById, getCabins } from "@/services/apiCabins";

type Cabin = {
  id: number;
  name: string;
  image: string;
  price: number;
  discount: number;
  maxCapacity: number;
};

export default function CabinsTable() {
  const { data: cabins, isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  if (isLoading) return null;

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
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
          <CabinsTableRow key={cabin.id} cabin={cabin} />
        ))}
      </TableBody>
    </Table>
  );
}

function CabinsTableRow({ cabin }: { cabin: Cabin }) {
  const { id, image, name, maxCapacity, price, discount } = cabin;
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const { mutate: deleteCabinByIdMutate, isPending } = useMutation({
    mutationFn: deleteCabinById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast({ description: "hi" });
    },
  });

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
        <Button disabled={isPending} onClick={() => deleteCabinByIdMutate(id)}>
          DEL
        </Button>
      </TableCell>
    </TableRow>
  );
}
