import Pagination from 'react-bootstrap/Pagination';

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationComponentProps): JSX.Element => {
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const generatePaginationItems = () => {
    const paginationItems = [];
    const visiblePages = 3;

    const startPage = Math.max(1, currentPage - visiblePages);
    const endPage = Math.min(totalPages, currentPage + visiblePages);

    if (startPage > 1) {
      paginationItems.push(
        <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
          1
        </Pagination.Item>,
      );
      if (startPage > 2) {
        paginationItems.push(<Pagination.Ellipsis key="ellipsis-start" />);
      }
    }

    for (let number = startPage; number <= endPage; number++) {
      paginationItems.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>,
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationItems.push(<Pagination.Ellipsis key="ellipsis-end" />);
      }
      paginationItems.push(
        <Pagination.Item
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>,
      );
    }

    return paginationItems;
  };

  return (
    <div className="d-flex flex-column align-items-center mt-3">
      <Pagination size="lg">
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {generatePaginationItems()}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
