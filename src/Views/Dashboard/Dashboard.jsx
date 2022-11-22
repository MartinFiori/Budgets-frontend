import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import MovementsContainer from "../../Components/MovementsContainer/MovementsContainer";
import { MovementContext } from "../../Context/MovementContext";

const Dashboard = () => {
	const { movements, total, getMovements } = useContext(MovementContext);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		!movements.length && getMovements();
	}, [getMovements, movements]);

	return (
		<>
			<div>
				<h1>{user?.username}'s Dashboard</h1>
				<h2>${total}</h2>
				<Link to="/createMovement">Create</Link>
				<MovementsContainer movements={movements} />
			</div>
		</>
	);
};

export default Dashboard;
