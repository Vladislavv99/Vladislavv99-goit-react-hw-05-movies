import axios from 'axios';

const API_KEY = '077542ca1acb186c550ac02d63fc7590';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrendMovie = () => {
  const data = axios.get(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`);
  return data;
};

export const fetchSearchMovie = query => {
  const data = axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`
  );
  return data;
};

export const fetchMovieDetails = id => {
  const data = axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  return data;
};

export const fetchCast = id => {
  const data = axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
  return data;
};

export const fetchReviews = id => {
  const data = axios.get(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`);
  return data;
};
