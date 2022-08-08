import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";

import { auth } from "../services/auth0.service";
import { Auth0DecodedHash, Auth0Error, Auth0ParseHashError, Auth0UserProfile } from "auth0-js";

const PostAuthenticate: React.FC = () => {
	const location = useLocation();

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

							alert("User Login Successfull");
							console.log(result);
						});
					}
				}
			}
		);
	};

	// adding dependancy for the location
	useEffect(() => {
		if (location.hash) {
			processHash(location.hash);
		}
	}, [location]);

	return <div>Loading</div>;
};

export default PostAuthenticate;
