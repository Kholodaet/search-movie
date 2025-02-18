import axios from "axios";

const url = "https://api.themoviedb.org/3";

const headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzgyOTg1YjZiZDI0MDQwMTdmZjUyNmI3ZTY0Y2VlNyIsIm5iZiI6MTcyMDA5NjQ0Mi42NzkxMDEsInN1YiI6IjY2ODEyZGFjMjM2MTJmZjJlYWZlN2EyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xKfGLFWimmwzATKE71ygbxwBXI7g5CDJIzb2vG4d6-E",
};

export const getTrendingMovies = async function () {
  try {
    const response = await axios.get(`${url}/trending/movie/week`, {
      params: { language: "en-US" },
      headers,
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return []; // Повертаємо пустий масив у разі помилки
  }
};

export const getSearchMovies = async function (query, page = 1) {
  try {
    const response = await axios.get(`${url}/search/movie`, {
      params: {
        query,
        page,
        language: "en-US",
      },
      headers,
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching search movies:", error);
    return []; // Повертаємо пустий масив у разі помилки
  }
};

export const getDetailsMovies = async function (id) {
  try {
    const response = await axios.get(`${url}/movie/${id}`, {
      params: { language: "en-US" },
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null; // Повертаємо null у разі помилки
  }
};

export const getCreditsMovies = async function (id) {
  try {
    const response = await axios.get(`${url}/movie/${id}/credits`, {
      headers,
    });
    return response.data.cast;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    return []; // Повертаємо пустий масив у разі помилки
  }
};

export const getReviewsMovies = async function (id) {
  try {
    const response = await axios.get(`${url}/movie/${id}/reviews`, {
      params: { language: "en-US" },
      headers,
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    return []; // Повертаємо пустий масив у разі помилки
  }
};

export const getCastByMovieId = async function (id) {
  try {
    const response = await axios.get(`${url}/movie/${id}/credits`, {
      headers,
    });
    return response.data.cast;
  } catch (error) {
    console.error("Error fetching cast by movie id:", error);
    return []; // Повертаємо пустий масив у разі помилки
  }
};
