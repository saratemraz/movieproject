import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardMovie = ({ mov, onClick }) => {
  return (
    <Link to={`/movie/${mov.id}`}>
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
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardMovie;
