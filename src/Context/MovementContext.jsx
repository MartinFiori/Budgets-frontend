import React, { useState, useEffect, createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";
const MovementContext = createContext();

const MovementProvider = ({ children }) => {
	const { token } = useContext(AuthContext);
	const [allMovements, setAllMovements] = useState([]);
	const [movements, setMovements] = useState([]);
	const [activeFilter, setActiveFilter] = useState("all");
	const [loading, setLoading] = useState(false);
	const [total, setTotal] = useState(0);

	function handleSetActiveFilter(actualFilter) {
		setActiveFilter(actualFilter);
		fetch(`http://localhost:8080/movements/filter/${actualFilter}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`,
			},
		})
			.then(res => res.json())
			.then(data => setMovements(data))
			.catch(err => console.log(err));
	}

	function getMovements() {
		setLoading(true);
		!allMovements.length &&
			fetch("http://localhost:8080/movements/getAll", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${JSON.parse(
						localStorage.getItem("token")
					)}`,
				},
			})
				.then(res => res.json())
				.then(data => {
					setTotal(data.user.balance);
					setMovements(data.user.Movements);
					setAllMovements(data.user.Movements);
				})
				.catch(err => console.log(err.err))
				.finally(() => setLoading(false));
	}

	function updateMovement(inputs, activeMovement) {
		fetch(`http://localhost:8080/movements/update/${activeMovement.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(inputs),
		})
			.then(res => res.json())
			.then(data => {
				if (activeFilter === "all") setMovements(data);
				else handleSetActiveFilter(activeFilter);
			})
			.catch(err => console.log(err));
	}

	function deleteMovement(movement_id) {
		fetch(`http://localhost:8080/movements/delete/${movement_id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`,
			},
		})
			.then(res => res.json())
			.then(data => {
				if (activeFilter === "all") setMovements(data);
				else handleSetActiveFilter(activeFilter);
			})
			.catch(err => console.log(err));
	}

	function createMovement(form_data) {
		fetch("http://localhost:8080/movements/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(form_data),
		})
			.then(res => res.json())
			.then(data => setMovements(data.Movements))
			.catch(err => console.log(err));
	}

	useEffect(() => {
		setTotal(
			movements.reduce(
				(acc, el) =>
					acc + (el.type === "income" ? el.amount : -el.amount),
				0
			)
		);
	}, [movements]);

	const movementData = {
		getMovements,
		deleteMovement,
		updateMovement,
		createMovement,
		handleSetActiveFilter,
		movements,
		activeFilter,
		loading,
		total,
	};
	return (
		<MovementContext.Provider value={movementData}>
			{children}
		</MovementContext.Provider>
	);
};

export { MovementContext, MovementProvider };
