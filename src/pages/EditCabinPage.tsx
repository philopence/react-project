import { useLocation } from "react-router-dom";
import EditCabinForm from "@/features/cabins/EditCabinForm";

export default function EditCabinPage() {
  const { state: cabin } = useLocation();

  if (!cabin) return null;

  return <EditCabinForm cabin={cabin} />;
}
