import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";

type Props = {
  totalPage: number;
  totalBooking: number;
};

// JUST FOR TEST
const LIMIT = 2;

export default function Pagination({ totalPage, totalBooking }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const curPage = Number(searchParams.get("page") || 1);

  const isLastPage = curPage === totalPage;

  function handlePrevPage() {
    const prevPage = curPage > 1 ? curPage - 1 : curPage;
    searchParams.set("page", String(prevPage));
    setSearchParams(searchParams);
  }

  function handleNextPage() {
    const nextPage = curPage < totalPage ? curPage + 1 : totalPage;
    searchParams.set("page", String(nextPage));
    setSearchParams(searchParams);
  }

  if (totalPage <= 1) return null;

  return (
    <div className="flex items-center justify-between">
      <p>
        Showing {(curPage - 1) * LIMIT + 1} to{" "}
        {isLastPage ? totalBooking : curPage * LIMIT} of {totalBooking} results.
      </p>
      <div>
        <Button disabled={curPage === 1} onClick={handlePrevPage}>
          Prev
        </Button>
        <Button disabled={curPage === totalPage} onClick={handleNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
}
