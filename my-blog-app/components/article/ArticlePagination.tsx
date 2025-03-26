interface ArticlePaginationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onPageChange: (page: number) => void;
}
const ArticlePagination = ({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
}: ArticlePaginationProps) => {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span className="mx-4">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={onNextPage}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
export default ArticlePagination;
