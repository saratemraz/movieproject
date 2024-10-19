import "bootstrap/dist/css/bootstrap.min.css";
import MoviesList from "./components/MoviesList";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import axios from "axios";
import { useState, useEffect } from "react";
import MovieDetails from "./components/MovieDetails";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Footer from "./components/Footer";
import MyList from "./components/MyList";
import { MyMoviesContext } from "./context/MyMoviesContext";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [sortBy, setSortBy] = useState("popular");

  const getAllMovies = async (sort = "popular") => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${sort}?api_key=52ef927bbeb21980cd91386a29403c78&language=ar`
    );
    setMovies(res.data.results);
    setPageCount(res.data.total_pages);
  };

  const getPage = async (page, sort = sortBy) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${sort}?api_key=52ef927bbeb21980cd91386a29403c78&language=ar&page=${page}`
    );
    setMovies(res.data.results);
    // setPageCount(res.data.total_pages);
  };

  const onCategorySelect = async (category) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=52ef927bbeb21980cd91386a29403c78&language=ar&with_genres=${getGenreId(
          category
        )}`
      );
      setMovies(res.data.results);
      setPageCount(res.data.total_pages);
    } catch (error) {
      console.error("Error fetching movies by category:", error);
    }
  };

  const getGenreId = (category) => {
    const genres = {
      أكشن: 28,
      مغامرة: 12,
      "رسوم متحركة": 16,
      كوميديا: 35,
      جريمة: 80,
      وثائقي: 99,
      دراما: 18,
      عائلي: 10751,
      خيال: 14,
      تاريخ: 36,
      رعب: 27,
      موسيقى: 10402,
      غموض: 9648,
      رومانسية: 10749,
      "خيال علمي": 878,
      "فيلم تلفزيوني": 10770,
      إثارة: 53,
      حرب: 10752,
      ويسترن: 37,
    };
    return genres[category] || "";
  };

  const handleSortChange = async (sort) => {
    setSortBy(sort);
    await getPage(1, sort);
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  const search = async (word) => {
    if (word === "") {
      getAllMovies();
    } else {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=52ef927bbeb21980cd91386a29403c78&query=${word}&language=ar`
      );
      setMovies(res.data.results);
      setPageCount(res.data.total_pages);
    }
  };

  return (
    <MyMoviesContext>
      <div className="font color-body">
        <NavBar search={search} />
        <Container >
          <Routes>
            <Route
              path="/movieproject"
              element={
                <MoviesList
                  movies={movies}
                  getPage={getPage}
                  pageCount={pageCount}
                  onCategorySelect={onCategorySelect}
                  handleSortChange={handleSortChange}
                />
              }
            />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/mylist" element={<MyList />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </MyMoviesContext>
  );
};

const Main = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Main;
