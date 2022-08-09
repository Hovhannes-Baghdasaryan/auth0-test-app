const SET_CREDENTIALS = "SET_CREDENTIALS";
const CLEAR_CREDENTIALS = "CLEAR_CREDENTIALS";

const getLocalStorageUser = localStorage.getItem("user");

const initialState = {
	user: getLocalStorageUser ? JSON.parse(getLocalStorageUser) : null,
	token: localStorage.getItem("token"),
};

const authReducer = (state: any = initialState, action: any) => {
	switch (action.type) {
		case SET_CREDENTIALS:
			localStorage.setItem("token", action.payload.token);
			localStorage.setItem("user", JSON.stringify(action.payload.user));

			return { ...state, user: action.payload.user, token: action.payload.token };

		case CLEAR_CREDENTIALS:
			localStorage.removeItem("token");
			localStorage.removeItem("user");

			return { ...state, user: null, token: null };

		default:
			return state;
	}
};

export const setCredentials = (user: any, token: string) => ({
	type: SET_CREDENTIALS,
	payload: {
		user,
		token,
	},
});

export const clearCredentials = () => ({
	type: CLEAR_CREDENTIALS,
});

export default authReducer;
