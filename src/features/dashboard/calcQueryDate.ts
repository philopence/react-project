import { subDays } from "date-fns";

export default function calcQueryDate(lastDay: number) {
  const lastDate = subDays(new Date(), lastDay);

  const queryDate = new Date(
    lastDate.getFullYear(),
    lastDate.getMonth(),
    lastDate.getDate()
  ).toISOString();

  return queryDate;
}
