import Filter from "@/components/Filter";
import DurationChart from "@/features/dashboard/DurationChart";
import SalesChart from "@/features/dashboard/SalesChart";
import Statistics from "@/features/dashboard/Statistics";
import TodayActivity from "@/features/dashboard/TodayActivity";

export default function DashboardPage() {
  return (
    <section>
      <header>
        <Filter
          field="last"
          filters={[
            { label: "Last 7 days", value: "7" },
            { label: "Last 30 days", value: "30" },
            { label: "Last 90 days", value: "90" }
          ]}
        />
      </header>

      <main>
        <Statistics />
        <div className="grid grid-cols-2 h-[200px]">
          <div>
            <TodayActivity />
          </div>
          <div>
            <DurationChart />
          </div>
        </div>
        <SalesChart />
      </main>
    </section>
  );
}
