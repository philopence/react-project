import Filter from "@/components/Filter";
import Statistics from "@/features/dashboard/Statistics";

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
      </main>
    </section>
  );
}
