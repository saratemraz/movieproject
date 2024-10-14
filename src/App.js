
import 'bootstrap/dist/css/bootstrap.min.css';
import MoviesList from './components/MoviesList';
import { Container, Row, Col, Button, Collapse } from 'react-bootstrap';
import NavBar from './components/NavBar';
import axios from "axios";
import { useState, useEffect } from "react";
import MovieDetails from './components/MovieDetails';  
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';  // استيراد Footer

const App = () => {
  const [movies, setMovies] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [sortBy, setSortBy] = useState('popular');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getAllMovies = async (sort = 'popular') => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${sort}?api_key=52ef927bbeb21980cd91386a29403c78&language=ar`);
    setMovies(res.data.results);
    setPageCount(res.data.total_pages);
  };

  const getPage = async (page, sort = sortBy) => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${sort}?api_key=52ef927bbeb21980cd91386a29403c78&language=ar&page=${page}`);
    setMovies(res.data.results);
    setPageCount(res.data.total_pages);
  };

  const onCategorySelect = async (category) => {
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=52ef927bbeb21980cd91386a29403c78&language=ar&with_genres=${getGenreId(category)}`);
      setMovies(res.data.results);
      setPageCount(res.data.total_pages);
    } catch (error) {
      console.error("Error fetching movies by category:", error);
    }
  };

  const getGenreId = (category) => {
    const genres = {
      "أكشن": 28,
      "مغامرة": 12,
      "رسوم متحركة": 16,
      "كوميديا": 35,
      "جريمة": 80,
      "وثائقي": 99,
      "دراما": 18,
      "عائلي": 10751,
      "خيال": 14,
      "تاريخ": 36,
      "رعب": 27,
      "موسيقى": 10402,
      "غموض": 9648,
      "رومانسية": 10749,
      "خيال علمي": 878,
      "فيلم تلفزيوني": 10770,
      "إثارة": 53,
      "حرب": 10752,
      "ويسترن": 37,
    };
    return genres[category] || "";
  };

  const handleSortChange = async (sort) => {
    setSortBy(sort);
    await getPage(1, sort);
  };

  const handleMovieCardClick = () => {
    setIsSidebarVisible(false);
  };

  const location = useLocation();
  
  // تأكد من أن الـ Sidebar يختفي عند الانتقال لأي مسار غير الصفحة الرئيسية
  useEffect(() => {
    if (location.pathname === '/movieproject') {
      setIsSidebarVisible(true);
    } else {
      setIsSidebarVisible(false);
    }
  }, [location]);

  useEffect(() => {
    getAllMovies();
  }, []);

  const search = async (word) => {
    if (word === "") {
      getAllMovies();
    } else {
      const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=52ef927bbeb21980cd91386a29403c78&query=${word}&language=ar`);
      setMovies(res.data.results);
      setPageCount(res.data.total_pages);
    }
  };

  return (
    <div className="font color-body">
      <NavBar search={search} />
      <Container fluid>
        <Row>
          {/* إظهار أو إخفاء الـ Sidebar بناءً على حالة isSidebarVisible */}
          {isSidebarVisible && (
            <Col md={2} className={isCollapsed ? "d-none d-md-block" : ""}>
              <Button
                onClick={() => setIsCollapsed(!isCollapsed)}
                aria-controls="sidebar-collapse"
                aria-expanded={isCollapsed}
                className="d-md-none"
              >
                {isCollapsed ? "فتح القائمة" : "إغلاق القائمة"}
              </Button>
              <Collapse in={!isCollapsed}>
                <div id="sidebar-collapse">
                  <Sidebar 
                    getPage={getPage} 
                    onCategorySelect={onCategorySelect} 
                    handleSortChange={handleSortChange} 
                  />
                </div>
              </Collapse>
            </Col>
          )}
          <Col md={isSidebarVisible ? 10 : 12}>
            <Routes>
              <Route 
                path='/movieproject' 
                element={<MoviesList movies={movies} getPage={getPage} pageCount={pageCount} handleMovieCardClick={handleMovieCardClick} />} 
              />
              <Route path='/movie/:id' element={<MovieDetails />} />
            </Routes>
          </Col>
        </Row>
      </Container>
      <Footer /> 
    </div>
  );
}

const Main = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Main;
