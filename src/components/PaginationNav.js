export default function PaginationNav({ handlePageChange, currentPage, totalPages }) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const maxPagesToShow = 5;

  const goToPreviousPage = () => {
    if (!isFirstPage) {
      handlePageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (!isLastPage) {
      handlePageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i}>
          <a
            className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${
              currentPage === i ? 'font-bold' : 'text-surface'
            } transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none active:bg-neutral-100`}
            onClick={() => handlePageChange(i)}
            href="#!"
          >
            {i}
            {currentPage === i && (
              <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip:rect(0,0,0,0)">
                (current)
              </span>
            )}
          </a>
        </li>
      );
    }

    if (startPage > 1) {
      pages.unshift(
        <li key="ellipsis-start">
          <span className="px-2 py-1.5 text-sm text-surface">.</span>
        </li>
      );
      pages.unshift(
        <li key={1}>
          <a
            className={`relative block rounded bg-transparent px-2 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none active:bg-neutral-100`}
            onClick={() => handlePageChange(1)}
            href="#!"
          >
            1
          </a>
        </li>
      );
    }

    if (endPage < totalPages) {
      pages.push(
        <li key="ellipsis-end">
          <span className="px-2 py-1.5 text-sm text-surface">.</span>
        </li>
      );
      pages.push(
        <li key={totalPages}>
          <a
            className={`relative block rounded bg-transparent px-2 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none active:bg-neutral-100`}
            onClick={() => handlePageChange(totalPages)}
            href="#!"
          >
            {totalPages}
          </a>
        </li>
      );
    }

    return pages;
  };

  return (
    <div className="md:max-w-full overflow-x-auto">
      <ul className="list-style-none flex justify-between">
        <li>
          <a
            className={`relative block rounded bg-transparent px-3 py-1.5 text-sm font-black ${
              isFirstPage ? 'text-gray-400 cursor-not-allowed' : 'text-surface'
            } transition duration-300`}
            onClick={goToPreviousPage}
            style={{ pointerEvents: isFirstPage ? 'none' : 'auto' }}
          >
            {"↼"}
          </a>
        </li>
        {renderPageNumbers()}
        <li>
          <a
            className={`relative block rounded bg-transparent px-3 py-1.5 text-sm font-black ${
              isLastPage ? 'text-gray-400 cursor-not-allowed' : 'text-surface'
            } transition duration-300`}
            onClick={goToNextPage}
            style={{ pointerEvents: isLastPage ? 'none' : 'auto' }}
          >
            {"⇀"}
          </a>
        </li>
      </ul>
    </div>
  );
}
