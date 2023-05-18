import React, { useEffect } from "react";
import "./Pagination.css";

const Pagination = ({ total, PerPage, setCurrentPage, currentPage }) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(total / PerPage); i++) {
    pages.push(i);
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="Pagination">
      <button
        className="forward"
        onClick={() =>
          currentPage === 1
            ? setCurrentPage(currentPage)
            : setCurrentPage(currentPage - 1)
        }
      >
        &#60;
      </button>
      {pages
        .slice(currentPage === 1 ? 0 : currentPage - 2, currentPage + 2)
        .map((page, index) => {
          return (
            <button
              key={index}
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? "active" : ""}
            >
              {page}
            </button>
          );
        })}
      <button
        className="backward"
        onClick={() =>
          currentPage === pages.length
            ? setCurrentPage(currentPage)
            : setCurrentPage(currentPage + 1)
        }
      >
        &#62;
      </button>
    </div>
  );
};

export default Pagination;
