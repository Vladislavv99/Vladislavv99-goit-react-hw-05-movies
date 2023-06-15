import { useState, useEffect } from 'react';
import { fetchSearchMovie } from 'services/moviesAPI';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';
import { Searchbar } from 'components/Searchbar/Searchbar';
import  MoviesGallery  from 'components/MoviesGallery/MoviesGallery';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const [isLoader, setIsLoader] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  const getMoviesFromInput = query => {
    setSearchParams({ query });
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    (async () => {
      setIsLoader(true);
      try {
        const { data } = await fetchSearchMovie(query);
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoader(false);
      }
    })();
  }, [query]);

  return (
    <>
      <Searchbar getMoviesFromInput={getMoviesFromInput} />
      {isLoader && <Loader />}
      <MoviesGallery movies={movies} location={location} />
    </>
  );
};
export default Movies;