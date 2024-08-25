import { useLocation } from "react-router-dom";
import UpdateCabinForm from "@/features/cabin/UpdateCabinForm";

export default function UpdateCabinPage() {
  const { state: cabin } = useLocation();

  if (!cabin) return null;

  return <UpdateCabinForm cabin={cabin} />;
}
