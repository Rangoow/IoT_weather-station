import { GET_CITIES, DELETE_CITY, ADD_CITY } from "../actions/types";

const apisAdresses = {
	openw: "",
	thinkspeak: ""
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_API:
			return {
				...state
			};
		default:
			return state;
	}
}
