import React from 'react';
import axios from 'axios';

const API_KEY = 'api_key=9e6b818dd8c5fc8abe2ae6ad33709e86';
const BASE_URL = 'https://api.themoviedb.org/3';

/* ======== Popular movies Api Call ==========*/
export const getPopularMoviesApiCall = async () => {
  const res = await axios.get(`${BASE_URL}/movie/popular?${API_KEY}`);
  return res.data.results;
};

/* ======== Upcoming movies Api Call ==========*/
export const getUpcomingMoviesApiCall = async () => {
  const res = await axios.get(`${BASE_URL}/movie/upcoming?${API_KEY}`);
  return res.data.results;
};

/* ======== Popular TV Api Call ==========*/
export const getPopularTvApiCall = async () => {
  const res = await axios.get(`${BASE_URL}/tv/popular?${API_KEY}`);
  return res.data.results;
};

/* ======== Get Family Movies Api Call ==========*/
export const getFamilyMovieApiCall = async () => {
  const res = await axios.get(
    `${BASE_URL}/discover/movie?${API_KEY}&with_genres=10751`,
  );
  return res.data.results;
};

/* ======== Get Documentry Movies Api Call ==========*/
export const getDocumentryMovieApiCall = async () => {
  const res = await axios.get(
    `${BASE_URL}/discover/movie?${API_KEY}&with_genres=99`,
  );
  return res.data.results;
};

/* ======== Movie Detail Api Service ==========*/
export const getMovieDetailApiCall = async id => {
  const res = await axios.get(`${BASE_URL}/movie/${id}?${API_KEY}`);
  return res.data;
};
