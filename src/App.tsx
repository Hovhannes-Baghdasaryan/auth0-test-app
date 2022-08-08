import React from "react";

// component import
import PostAuthenticate from "./components/PostAuthenticate";
import Register from "./components/Register";
import Login from "./components/Login";

// router import
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App: React.FC = () => (
	<Routes>
		<Route path="authenticate" caseSensitive={true} element={<PostAuthenticate />} />
		<Route path="register" caseSensitive={true} element={<Register />} />
		<Route path="login" caseSensitive={true} element={<Login />} />
	</Routes>
);

const AppWrapper = () => (
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

export default AppWrapper;
