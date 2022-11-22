import { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../../constants/url";
import ErrorText from "../../Components/ErrorText/ErrorText";
import s from "./Register.module.css";

const Register = () => {
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const { username, email, password } = user;

	const handleSetUser = e => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (Object.values(user).every(Boolean)) {
			setLoading(true);
			setError(null);
			fetch(signup, {
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
						setError(null);
						setSuccess(true);
					}
				})
				.catch(err => setError(err.message))
				.finally(() => setLoading(false));
		} else {
			setError("Complete all inputs");
		}
	};

	return (
		<>
			{success ? (
				<div>
					<h3>¡User created successfully!</h3>
					<Link to={"/"}>Log in</Link>
				</div>
			) : (
				<form onSubmit={handleSubmit} className={s.container}>
					<h3 className={s.title}>Register</h3>
					<label>Username:</label>
					<input
						type="text"
						value={username}
						onChange={handleSetUser}
						name="username"
					/>
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={handleSetUser}
						name="email"
					/>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={handleSetUser}
						name="password"
					/>
					<Link to={"/auth/signin"} className={s.link}>
						Sign in
					</Link>
					{error && <ErrorText>{error}</ErrorText>}
					<input
						type="submit"
						className={s.submitBtn}
						value={loading ? "Loading..." : "Create user"}
					/>
				</form>
			)}
		</>
	);
};

export default Register;
