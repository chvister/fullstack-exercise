import { useState } from "react";

export const usePagination = (initialPage: number = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToPage = (page: number) => setCurrentPage(Math.max(1, page));

  return { currentPage, nextPage, prevPage, goToPage };
};
