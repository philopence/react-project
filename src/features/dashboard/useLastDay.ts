import { useSearchParams } from "react-router-dom";

const DEFAULT_DAY = 7;

export default function useLastDay() {
  const [searchParams] = useSearchParams();

  const lastValue = Number(searchParams.get("last") || DEFAULT_DAY);

  return lastValue;
}
