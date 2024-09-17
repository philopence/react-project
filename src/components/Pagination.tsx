import { PropsWithChildren } from "react";
import { useSearchParams } from "react-router-dom";
import { PaginationResponse } from "@/schemas/response";
import { Button } from "./ui/button";

/**
 * @description update page search param & display pagination info
 */
export default function Pagination({
  pagination
}: PropsWithChildren<{
  pagination: PaginationResponse;
}>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const isFirstPage = pagination.page === 1;
  const isLastPage = pagination.page === pagination.totalPages;

  function handlePrevPage() {
    if (isFirstPage) return;
    searchParams.set("page", String(pagination.page - 1));
    setSearchParams(searchParams);
  }

  function handleNextPage() {
    if (isLastPage) return;
    searchParams.set("page", String(pagination.page + 1));
    setSearchParams(searchParams);
  }

  return (
    <div className="flex items-center justify-between">
      <p>
        Showing
        <span>{(pagination.page - 1) * pagination.limit + 1}</span>
        to
        <span>
          {isLastPage
            ? pagination.totalItems
            : pagination.page * pagination.limit}
        </span>
        of
        <span>{pagination.totalItems}</span>
        results.
      </p>
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
