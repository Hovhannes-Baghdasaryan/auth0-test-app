import React from "react";

// store import
import { useDispatch, useSelector } from "react-redux";

// constant import
import { AUTH0_CLIENT_ID, AUTH0_LOGOUT_URI } from "../config";

// action creators
import { clearCredentials } from "../services/auth/authReducer";
import { auth } from "../services/auth0.service";

const Profile = () => {
	const { user } = useSelector((state: any) => state.auth);
	const dispatch = useDispatch();

	const LogoutCallback = () => {
		dispatch(clearCredentials());

		auth.logout({
			returnTo: AUTH0_LOGOUT_URI,
			clientID: AUTH0_CLIENT_ID,
		});
	};

	return (
		<>
			<img alt="" src={user?.picture} />
			<h1>{user?.email}</h1>
			<p>{user?.created_at}</p>
			<p>{user?.nickname}</p>
			<button onClick={LogoutCallback}>Logout</button>
		</>
	);
};

export default Profile;
