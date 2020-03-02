import { GET_CITIES, ADD_CITY } from "../actions/types";

const initialState = {
	cities: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_CITIES:
			return {
				...state,
				cities: action.payload
			};
		case ADD_CITY:
			return {
				...state,
				cities: [action.payload, ...state.cities]
			};
		default:
			return state;
	}
}
