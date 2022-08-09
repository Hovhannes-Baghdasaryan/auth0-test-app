import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

// auth0
import { Auth0Error } from "auth0-js";
import { auth } from "../services/auth0.service";
import { AUTH0_LOGIN_REDIRECT_URI, AUTH0_REALM, AUTH0_LOGIN_RESPONSE_TYPE } from "./../config";

interface LoginFormType {
	password: string;
	email: string;
}

const Login: React.FC = () => {
	const [user, setFormState] = useState<LoginFormType>({ email: "", password: "" });
	const navigate = useNavigate();

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormState({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit: React.MouseEventHandler<HTMLButtonElement> = e => {
		e.preventDefault();
		console.log(user);

		auth.login(
			{
				username: user.email,
				password: user.password,
				realm: AUTH0_REALM,
				redirectUri: AUTH0_LOGIN_REDIRECT_URI,
				responseType: AUTH0_LOGIN_RESPONSE_TYPE,
			},
			(error: Auth0Error | null, result: any) => {
				if (error) {
					alert("Oops! Login Failed");
					console.log(error);
					return;
				}

				console.log(result);
				alert("Login Successful");
			}
		);
	};

	return (
		<div style={{ display: "flex", flexFlow: "column", width: 300, alignItems: "center", margin: "0 auto", gap: 20 }}>
			<div>
				<h1>Login</h1>
				<p>Sign In To Application</p>
			</div>
			<form style={{ display: "flex", flexFlow: "column", gap: 20, alignItems: "center" }}>
				<input name="email" type="email" placeholder="write email" value={user.email} onChange={changeHandler} />
				<input name="password" type="password" placeholder="write password" value={user.password} onChange={changeHandler} />
				<button type="button" onClick={onSubmit}>
					Login
				</button>
				<button onClick={() => navigate("/register")}>Don't Have An Account?</button>
			</form>
		</div>
	);
};

export default Login;
