import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const Paginate = () => {
  const [, setCurrentPage] = useState(0);
  const pageCount = 5;
 
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (

      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
  );
};

export default Paginate;
