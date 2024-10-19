import { useMovies } from "../context/MyMoviesContext";
import { Link } from "react-router-dom";
function MyList() {
  const { myList, setMyList } = useMovies();
  const deleteFromList = (id) => {
    setMyList(myList.filter((mov) => mov.id !== id));
  };
  if (!myList || myList.length === 0) {
    return (
      <div className="min_height">
        <h2 class="d-flex justify-content-center align-items-center my-5">
          لا يوجد قائمة
        </h2>
      </div>
    );
  }
  return (
    <div class="min_height">
      <h2>قائمتي المفضله</h2>
      <div class="my_movies_list">
        {myList.map((mov) => (
          <div className="card">
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
                <Link to={`/movie/${mov.id}`}>
                  <button className="btn btn-primary w-100 my-1">
                    للمشاهده
                  </button>
                </Link>
                <button
                  className="btn btn-dark w-100 my-1"
                  onClick={() => deleteFromList(mov.id)}
                >
                  حذف
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
