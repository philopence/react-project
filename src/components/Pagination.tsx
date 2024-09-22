import { PropsWithChildren } from "react";
import { useSearchParams } from "react-router-dom";
import { PaginationResponse } from "@/schemas/response";
import { Button } from "./ui/button";

/**
 * @description update page search param & display pagination info
 */
export default function Pagination({
  pagination: { page, totalPages, totalItems, limit }
}: PropsWithChildren<{
  pagination: PaginationResponse;
}>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  function handlePrevPage() {
    if (isFirstPage) return;
    searchParams.set("page", String(page - 1));
    setSearchParams(searchParams);
  }

  function handleNextPage() {
    if (isLastPage) return;
    searchParams.set("page", String(page + 1));
    setSearchParams(searchParams);
  }

  return (
    <div className="flex items-center justify-between">
      <Info
        from={(page - 1) * limit + 1}
        to={isLastPage ? totalItems : page * limit}
        total={totalItems}
      />
      <div>
        <Button disabled={isFirstPage} onClick={handlePrevPage}>
          Prev
        </Button>
        <Button disabled={isLastPage} onClick={handleNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
}

function Info({
  from,
  to,
  total
}: PropsWithChildren<{
  from: number;
  to: number;
  total: number;
}>) {
  return (
    <p>
      Showing
      <span>{from}</span>
      to
      <span>{to}</span>
      of
      <span>{total}</span>
      results.
    </p>
  );
}
