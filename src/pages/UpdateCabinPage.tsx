import { useParams } from "react-router-dom";
import UpdateCabin from "@/features/cabin/UpdateCabin";

export default function UpdateCabinPage() {
  // const { state: cabin } = useLocation();
  //
  // if (!cabin) return null;
  //
  const params = useParams();

  if (params.id === undefined) return null;

  return <UpdateCabin id={params.id} />;
}
