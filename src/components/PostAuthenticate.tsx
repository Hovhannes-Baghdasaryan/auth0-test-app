import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";

import { auth } from "../services/auth0.service";
import { Auth0DecodedHash, Auth0Error, Auth0ParseHashError, Auth0UserProfile } from "auth0-js";
import { AUTH0_CLIENT_ID, AUTH0_LOGIN_RESPONSE_TYPE, AUTH0_LOGOUT_URI } from "../config";

// store import
import { useDispatch, useSelector } from "react-redux";

// action creators import
import { clearCredentials, setCredentials } from "../services/auth/authReducer";

const PostAuthenticate: React.FC = () => {
	const location = useLocation();

	const { user } = useSelector((state: any) => state.auth);
	const dispatch = useDispatch();

	const processHash = (hash: string) => {
		auth.parseHash(
			{
				hash,
			},
			(error: Auth0ParseHashError | null, result: Auth0DecodedHash | null) => {
				if (error) {
					alert("Oops! There Is Something Wrong");
					console.log(error);
					return;
				}

				if (result) {
					const { accessToken } = result;

					/*
                        1. Store this token in local Storage
                        2. Authenticate application routes on the base of token
                    */

					if (accessToken) {
						auth.client.userInfo(accessToken, (error: Auth0Error | null, result: Auth0UserProfile) => {
							if (error) {
								alert("Something went wrong in fetching user profile");
								console.log(error);
								return;
							}

							dispatch(setCredentials(result, accessToken));
							alert("User Login Successfull");
						});
					}
				}
			}
		);
	};

	const LogoutCallback = () => {
		dispatch(clearCredentials());

		auth.logout({
			returnTo: AUTH0_LOGOUT_URI,
			clientID: AUTH0_CLIENT_ID,
		});
	};

	console.log(user);

	// adding dependancy for the location
	useEffect(() => {
		if (location.hash && !user) {
			processHash(location.hash);
		}
	}, [location, user]);

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

export default PostAuthenticate;
