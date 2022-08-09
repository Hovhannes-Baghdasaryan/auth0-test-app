import React, { useState } from "react";

import { Auth0Error } from "auth0-js";
import { AUTH0_REALM } from "../config";
import { auth } from "../services/auth0.service";
import { useNavigate } from "react-router-dom";

interface RegisterFormType {
	password: string;
	email: string;
}

const Register: React.FC = () => {
	const [formState, setFormState] = useState<RegisterFormType>({ email: "", password: "" });
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const navigate = useNavigate();

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormState({
			...formState,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		console.log(formState);

		auth.signup(
			{
				email: formState.email,
				password: formState.password,
				connection: AUTH0_REALM,
			},
			(error: Auth0Error | null, result: any) => {
				if (error) {
					alert(`Oop! Registration Failed ${error?.name === "BadRequestError" ? "User Already Exists" : "Password Is Too Weak"}`);
					console.log(error);
					return;
				}

				alert("Registration success");
				console.log(result);
				navigate("/login");
			}
		);
	};

	return (
		<div style={{ display: "flex", flexFlow: "column", width: 300, alignItems: "center", margin: "0 auto", gap: 20 }}>
			<div>
				<h1>Register</h1>
				<p>Sign UP To Application</p>
			</div>
			<form style={{ display: "flex", flexFlow: "column", width: 300, alignItems: "center", margin: "0 auto", gap: 20 }}>
				<input name="email" type="email" placeholder="write email" value={formState.email} onChange={changeHandler} />
				<input
					name="password"
					type={showPassword ? "text" : "password"}
					placeholder="write password"
					value={formState.password}
					onChange={changeHandler}
				/>
				<button
					onClick={(e: any) => {
						e.preventDefault();
						setShowPassword(!showPassword);
					}}
				>
					Show
				</button>
				<button type="button" onClick={onSubmit}>
					Register
				</button>
				<button onClick={() => navigate("/login")}>Already Have An Account?</button>
			</form>
		</div>
	);
};

export default Register;
