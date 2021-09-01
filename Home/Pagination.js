import React from "react";


export const Pagination = ({ versePerPage, totalVerse, paginate }) => {
  const pageNumbers = [];
  const active = "";

  for (let i = 1; i <= Math.ceil(totalVerse / versePerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination flex-wrap">
        {pageNumbers.map((number, idx) => (
          <div key={number}>
            <li className={`page-item  ${active}`} aria-current="page">
              <a

                href="#"
                onClick={() => paginate(number)}
                className="page-link active"
              />
              {number}
            </li>
          </div>
        ))}
      </ul>
    </nav>
  );
};
