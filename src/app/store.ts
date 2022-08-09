import { combineReducers, createStore } from "redux";
import authReducer from "../services/auth/authReducer";

const rootReducer: any = combineReducers({
	auth: authReducer,
});

const store = createStore(rootReducer);

// @ts-ignore
window.__store__ = store;

export default store;
