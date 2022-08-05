import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

// component import
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import ProfileComponent from "./components/ProfileComponent";

// Provider components
import Auth0WithProvider from "./Provider/Auth0WithProvider";

const wrapperStyle: React.CSSProperties = {
	display: "flex",
	flexFlow: "column",
	alignItems: "center",
	height: "100%",
};

const App: React.FC = () => {
	const { isLoading } = useAuth0();

	if (isLoading) return <div>Loading...</div>;

	return (
		<div style={wrapperStyle}>
			<LoginButton />
			<LogoutButton />
			<ProfileComponent />
		</div>
	);
};

// domain is a URL when the user will be redirected after completing the authorization

// cliendId is a unique identifier like a key which will be accesable to a auth0 account profile
// also will provide auth0 client to know his project's users will use auth0 secure

// finally redirectUri will be a domain which user will be redirected to after successfully completing the authorizaton

// window.location.origin is the location where we ara right now
// It's the same as to use useLocation hook from react-router-dom and destructure pathname method from it
/*
	const {pathname} = useLocation();
		or
	const location = useLocation();
	location.pathname 	
*/

const AppWrapper = () => (
	<Auth0WithProvider>
		<App />
	</Auth0WithProvider>
);

export default AppWrapper;
