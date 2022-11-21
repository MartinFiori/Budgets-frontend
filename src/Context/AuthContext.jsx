import React, { useState, createContext, useEffect } from "react";
import { verifyUser } from "../constants/url.js";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(
		JSON.parse(localStorage.getItem("token"))
	);
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
	const [isLogged, setIsLogged] = useState(false);

	function clearToken() {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
	}

	useEffect(() => {
		if (token) {
			fetch(verifyUser, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(user),
			})
				.then(res => {
					if (res.status >= 400) {
						handleSetIsLogged(false);
						window.location.reload();
						clearToken();
					} else return res.json();
				})
				.then(bool => handleSetIsLogged(bool))
				.catch(err => console.log(err));
		} else {
			handleSetIsLogged(false);
		}
	}, [token, user]);

	function setLocalStorage(token, user) {
		token && localStorage.setItem("token", JSON.stringify(token));
		user && localStorage.setItem("user", JSON.stringify(user));
		setToken(token);
		setUser(user);
	}

	function handleSetIsLogged(bool) {
		setIsLogged(bool);
	}

	const tokenData = {
		clearToken,
		token,
		setLocalStorage,
		handleSetIsLogged,
		isLogged,
		user,
	};
	return (
		<AuthContext.Provider value={tokenData}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
