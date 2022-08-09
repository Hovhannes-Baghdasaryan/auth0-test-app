import React, { useEffect, useState } from "react";

import { Navigate, useLocation } from "react-router-dom";

import { auth } from "../services/auth0.service";
import { Auth0DecodedHash, Auth0Error, Auth0ParseHashError, Auth0UserProfile } from "auth0-js";
import { AUTH0_CLIENT_ID } from "../config";

const PostAuthenticate: React.FC = () => {
	const location = useLocation();
	const [user, setUser] = useState<Auth0UserProfile>();

	const token = localStorage.getItem("token");

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
						localStorage.setItem("token", accessToken);

						auth.client.userInfo(accessToken, (error: Auth0Error | null, result: Auth0UserProfile) => {
							if (error) {
								alert("Something went wrong in fetching user profile");
								console.log(error);
								return;
							}

							alert("User Login Successfull");
							console.log(result);
							setUser(result);
						});
					}
				}
			}
		);
	};

	const LogoutCallback = () => {
		auth.logout({
			returnTo: "/login",
			clientID: AUTH0_CLIENT_ID,
		});
	};

	// adding dependancy for the location
	useEffect(() => {
		if (location.hash) {
			processHash(location.hash);
		}
	}, [location]);

	if (!token) return <Navigate to="/login" />;

	return (
		<>
			{token && (
				<>
					<img alt="" src={user?.picture} />
					<h1>{user?.email}</h1>
					<p>{user?.created_at}</p>
					<p>{user?.nickname}</p>
					<button onClick={LogoutCallback}>Logout</button>
				</>
			)}
		</>
	);
};

export default PostAuthenticate;
