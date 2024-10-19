import React from "react";
import { useMovies } from "../context/MyMoviesContext";
import { Link } from "react-router-dom";

const CardMovie = ({ mov, onClick }) => {
  const { addToList } = useMovies();

  return (
    <>
      <div className="card">
        <img
          src={`https://image.tmdb.org/t/p/w500/${mov.poster_path}`}
          className="card__image"
          alt="hu"
        />
        <div onClick={onClick} className="card_overlay">
          <div className="overlay_text text-center w-100 p-2">
            <p>اسم الفيلم: {mov.original_title}</p>
            <p>تاريخ الاصدار: {mov.release_date}</p>
            <p>عدد المقيمين: {mov.vote_count}</p>
            <p>التقييم: {mov.vote_average}</p>
            <Link to={`/movie/${mov.id}`}>
              <button className="btn w-100 my-1">للمشاهده</button>
            </Link>
            <button
              className="btn w-100"
              onClick={() => addToList(mov)}
            >
              اضف للقائمه
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardMovie;
