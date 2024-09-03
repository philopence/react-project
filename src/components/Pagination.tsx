import { PropsWithChildren } from "react";
import { useSearchParams } from "react-router-dom";
import { PaginationResponseData } from "@/schemas/pagination";
import { Button } from "./ui/button";

/**
 * @description update search params
 */
export default function Pagination({
  pagination
}: PropsWithChildren<{
  pagination: PaginationResponseData;
}>) {
  console.log("pagination", pagination);

  const [searchParams, setSearchParams] = useSearchParams();

  const isFirstPage = pagination.curPage === 1;
  const isLastPage = pagination.curPage === pagination.totalPages;

  function handlePrevPage() {
    if (isFirstPage) return;
    searchParams.set("page", String(pagination.curPage - 1));
    setSearchParams(searchParams);
  }

  function handleNextPage() {
    if (isLastPage) return;
    searchParams.set("page", String(pagination.curPage + 1));
    setSearchParams(searchParams);
  }

  return (
    <div className="flex items-center justify-between">
      <p>
        Showing
        <span>{(pagination.curPage - 1) * pagination.limit + 1}</span>
        to
        <span>
          {isLastPage
            ? pagination.totalItems
            : pagination.curPage * pagination.limit}
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
