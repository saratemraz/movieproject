import React from "react";
import { Row } from "react-bootstrap";
import CardMovie from "./CardMovie";
import PaginationComponent from "./Pagination"; // تأكد من أن هذا هو اسم المكون
import Sidebar from "./Sidebar";

const MoviesList = ({
  movies,
  getPage,
  pageCount,
  onCategorySelect,
  handleSortChange,
}) => {
  return (
    <>
      <div>
        <Sidebar
          getPage={getPage}
          onCategorySelect={onCategorySelect}
          handleSortChange={handleSortChange}
        />
        <div className="movies-container ">
          {movies.length >= 1 ? (
            movies.map((mov) => {
              return (
                <CardMovie
                  key={mov.id}
                  mov={mov}
                  //   onClick={handleMovieCardClick}
                />
              );
            })
          ) : (
            <h2 className="text-center p-5">لا يوجد أفلام..........</h2>
          )}
        </div>
      </div>

      {movies.length >= 1 ? (
        <PaginationComponent getPage={getPage} pageCount={pageCount} />
      ) : null}
    </>
  );
};

export default MoviesList;
