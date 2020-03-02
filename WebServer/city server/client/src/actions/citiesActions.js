import { GET_CITIES, ADD_CITY } from "./types";
import axios from "axios";

export const getCities = () => dispatch => {
	axios
		.get(`api/`)
		.then(res => dispatch({ type: GET_CITIES, payload: res.data }));
};

export const addCity = city => dispatch => {
	axios
		.post(`api/`, { cityName: city.name, openWeather: city.openweather })
		.then(res => {
			dispatch({ type: ADD_CITY, payload: res.data });
		});
};
