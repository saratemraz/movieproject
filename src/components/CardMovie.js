import React from "react";
import { useMovies } from "../context/MyMoviesContext";
import {  useNavigate } from "react-router-dom";

const CardMovie = ({ mov, onClick }) => {
  const { addToList } = useMovies();
  const navigate = useNavigate();
  const GoToMovie = (movie) => navigate(`/movie/${movie.id}`);
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

            <button
                  className="btn w-100 my-1"
                  onClick={() => GoToMovie(mov)}
                >
                  للمشاهده
                </button>
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
