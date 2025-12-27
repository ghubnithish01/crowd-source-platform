import axios from "axios";
const API_URL = "http://localhost:5000/places";

export const fetchPlaces = (category) => {
  const url = category ? `${API_URL}?category=${category}` : API_URL;
  return axios.get(url);
};

export const addPlace = (formData) => axios.post(API_URL, formData, {
  headers: { "Content-Type": "multipart/form-data" }
});

export const likePlace = (id) => axios.patch(`${API_URL}/${id}/like`);

export const deletePlace = (id) => axios.delete(`${API_URL}/${id}`);
