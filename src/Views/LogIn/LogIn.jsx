import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorText from "../../Components/ErrorBtn/ErrorText";
import { AuthContext } from "../../Context/AuthContext";
import { logIn } from "../../constants/url";
import s from "./LogIn.module.css";
const LogIn = () => {
	const { setLocalStorage, handleSetIsLogged } = useContext(AuthContext);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();

	const handleSetData = e => {
		setUser(state => ({
			...state,
			[e.target.name]: e.target.value.trim(),
		}));
	};

	const handleSubmit = e => {
		e.preventDefault();
		setLoading(true);
		if (Object.values(user).every(Boolean)) {
			setError(null);
			fetch(logIn, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			})
				.then(res => res.json())
				.then(data => {
					if (data["error"]) setError(data.error);
					else {
						setLocalStorage(data.token, data.user);
						setError(null);
						return data;
					}
				})
				.then(jwt => {
					if (jwt?.user) {
						handleSetIsLogged(true);
						navigate("/home");
					}
				})
				.catch(err => {
					setError(err);
				})
				.finally(() => setLoading(false));
		} else {
			setError("Complete all inputs");
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className={s.container}>
			<h3 className={s.title}>Log in</h3>
			<label>Email:</label>
			<input
				type="email"
				name="email"
				value={user.email}
				onChange={handleSetData}
			/>
			<label>Password:</label>
			<input
				type="password"
				name="password"
				value={user.password}
				onChange={handleSetData}
			/>
			<Link to={"/auth/register"} className={s.link}>
				Create account
			</Link>
			{error && <ErrorText>{error}</ErrorText>}
			<input
				type="submit"
				className={s.submitBtn}
				value={loading ? "Cargando..." : "Log in"}
			/>
		</form>
	);
};

export default LogIn;
