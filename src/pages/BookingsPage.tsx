import BookingFilter from "@/features/booking/BookingFilter";
import BookingSorter from "@/features/booking/BookingSorter";
import BookingsTable from "@/features/booking/BookingsTable";

export default function BookingsPage() {
  return (
    <section>
      <header className="flex items-center justify-between">
        <div>Bookings Page Header</div>

        <div className="flex items-center gap-2">
          <div>
            <BookingFilter />
          </div>

          <div>
            <BookingSorter />
          </div>
        </div>
      </header>

      <main>
        <BookingsTable />
      </main>
    </section>
  );
}
