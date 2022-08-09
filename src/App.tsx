import React, { useEffect } from "react";

// component import
import PostAuthenticate from "./components/PostAuthenticate";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Login from "./components/Login";

// router import
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// store import
import store from "./app/store";
import { Provider, useSelector } from "react-redux";

const App: React.FC = () => {
	const { token } = useSelector((state: any) => state.auth);

	console.log(token);

	return (
		<Routes>
			<Route path="authenticate" caseSensitive={true} element={<PostAuthenticate />} />
			{token ? (
				<>
					<Route path="" element={<Navigate to="/authenticate" />} />
					<Route path="profile" element={<Profile />} />
					<Route path="*" element={<div>Not Found</div>} />
				</>
			) : (
				<>
					<Route path="register" element={<Register />} />
					<Route path="login" element={<Login />} />
					<Route path="*" element={<Navigate to="/login" />} />
				</>
			)}
		</Routes>
	);
};

const AppWrapper = () => (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

export default AppWrapper;
