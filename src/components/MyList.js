import { useMovies } from "../context/MyMoviesContext";
import { useNavigate } from "react-router-dom";

function MyList() {
  const { myList } = useMovies();
  const navigate = useNavigate();
  
  const GoToMovie = (movie) => navigate(`/movie/${movie.id}`);

  if (!myList || myList.length === 0) {
    return (
      <div className="min_height">
        <h2 className="d-flex justify-content-center align-items-center my-5">
          لا يوجد قائمة
        </h2>
      </div>
    );
  }

  return (
    <div>
      <h2>قائمتي المفضله</h2>
      <div className="my_movies_list">
        {myList.map((mov) => (
          <div className="card" key={mov.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${mov.poster_path}`}
              className="card__image"
              alt="hu"
            />
            <div className="card_overlay">
              <div className="overlay_text text-center w-100 p-2">
                <p>اسم الفيلم: {mov.original_title}</p>
                <p>تاريخ الاصدار: {mov.release_date}</p>
                <p>عدد المقيمين: {mov.vote_count}</p>
                <p>التقييم: {mov.vote_average}</p>
                <button
                  className="btn w-100 my-1"
                  onClick={() => GoToMovie(mov)}
                >
                  للمشاهدة
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyList;
