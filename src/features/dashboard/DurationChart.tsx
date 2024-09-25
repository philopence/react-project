import { differenceInDays } from "date-fns";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import useRecentStaysQuery from "./useRecentStaysQuery";

function incValue<T extends { duration: string; value: number }>(
  data: T[],
  duration: string
) {
  const item = data.find((item) => item.duration === duration);
  if (!item) throw new Error();
  item.value += 1;
}

export default function DurationChart() {
  const recentStaysQuery = useRecentStaysQuery();
  if (recentStaysQuery.isPending) return null;
  if (recentStaysQuery.isError) return "ERROR";

  const durationsData = [
    { duration: "1-7 nights", value: 0, color: "#555555" },
    { duration: "8-14 nights", value: 0, color: "#999999" },
    { duration: "15-21 nights", value: 0, color: "#AAAAAA" },
    { duration: "22-30 nights", value: 0, color: "#DDDDDD" }
  ];

  recentStaysQuery.data.bookings.forEach((booking) => {
    const stayDay = differenceInDays(
      new Date(booking.endDate),
      new Date(booking.startDate)
    );

    if (stayDay >= 1 && stayDay <= 7) incValue(durationsData, "1-7 nights");
    if (stayDay >= 8 && stayDay <= 14) incValue(durationsData, "8-14 nights");
    if (stayDay >= 15 && stayDay <= 21) incValue(durationsData, "15-21 nights");
    if (stayDay >= 22 && stayDay <= 30) incValue(durationsData, "22-30 nights");
  });

  return (
    <article>
      <header>Durations</header>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={durationsData}
            nameKey="duration"
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={60}
            label
          >
            {durationsData.map((item) => (
              <Cell key={item.duration} fill={item.color} />
            ))}
          </Pie>
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconType="circle"
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </article>
  );
}
