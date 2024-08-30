import useGetBookingByIdQuery from "./useGetBookingByIdQuery";

type Props = {
  id: string;
};
export default function BookingDetail({ id }: Props) {
  const { isLoading, data: booking } = useGetBookingByIdQuery(id);

  if (isLoading) return null;

  console.log(booking);

  return <>BookingDetail</>;
}
